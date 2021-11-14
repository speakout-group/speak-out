import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { getSocketClient } from '../../../shared/utils/get-socket-client';
import { MessageService } from '../../messages/service/message.service';
import { UserService } from '../../user/service/user.service';
import { SponsorGateway } from '../gateway/sponsor.gateway';
import { remove } from '../../../shared/utils/remove';
import { User } from '../../user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, UpdateQuery } from 'mongoose';
import { Sponsor } from '../schema/sponsor.schema';
import { SponsorDto } from '../dto/sponsor.dto';
import { Socket } from 'socket.io';
import { Conf } from '../../conf/schema/conf.schema';
import { ConfService } from '../../conf/service/conf.service';

@Injectable()
export class SponsorService {
  private blockedFields: (keyof Sponsor)[] = ['members', 'owner', 'conf'];

  unpopulatedFields = '-' + this.blockedFields.join(' -');

  constructor(
    @InjectModel(Sponsor.name) private sponsorModel: Model<Sponsor>,
    // private confService: ConfService,
    private sponsorGateway: SponsorGateway,
    private userService: UserService,
    @Inject(forwardRef(() => MessageService))
    private messageService: MessageService
  ) {}

  async create(sponsor: SponsorDto, user: User) {
    const object = await this.sponsorModel.create({
      ...sponsor,
      owner: user._id,
    });

    return object
      .populate('owner', this.userService.unpopulatedFields)
      .execPopulate();
  }

  async update(sponsor: Sponsor, body: UpdateQuery<Sponsor>, user: User) {
    this.handleUpdateSponsor(sponsor, body as Sponsor);

    return this.sponsorModel
      .findOneAndUpdate({ _id: sponsor._id, owner: user._id }, body)
      .populate('owner', this.userService.unpopulatedFields);
  }

  handleUpdateSponsor(sponsor: Sponsor, body: Partial<Sponsor>) {
    this.sendMessage(sponsor, 'sponsor:update', Object.assign(sponsor, body));
  }

  delete(sponsor: Sponsor, user: User) {
    this.handleDeleteSponsor(sponsor);

    return Promise.all([
      this.sponsorModel.findOneAndDelete({ _id: sponsor._id, owner: user._id }),
    ]);
  }

  handleDeleteSponsor(sponsor: Sponsor) {
    this.sendMessage(sponsor, 'sponsor:delete', sponsor);
  }

  getSponsorByIdAndOwner(sponsorId: string, owner: User) {
    return this.sponsorModel
      .findOne({ _id: sponsorId, owner: owner._id })
      .populate('members', this.userService.unpopulatedFields)
      .populate('owner', this.userService.unpopulatedFields);
  }

  async validateSponsorByIdAndOwner(sponsorId: string, owner: User) {
    const sponsor = await this.getSponsorByIdAndOwner(sponsorId, owner);

    if (!sponsor) {
      throw new NotFoundException('Sponsor não encontrada');
    }

    return sponsor;
  }

  getSponsor(sponsorId: string) {
    return this.sponsorModel
      .findById(sponsorId)
      .populate('members', this.userService.unpopulatedFields)
      .populate('owner', this.userService.unpopulatedFields);
    // .populate('conf', this.confService.unpopulatedFields);
  }

  getSponsorsByConf(conf: Conf) {
    return this.sponsorModel.findOne({ conf: conf._id });
    // .populate('conf', this.confService.unpopulatedFields);
  }

  async validateSponsor(sponsorId: string) {
    const sponsor = await this.getSponsor(sponsorId);

    if (!sponsor) {
      throw new NotFoundException('Sponsor não encontrada');
    }

    return sponsor;
  }

  getSponsorsByMember(user: User) {
    return this.sponsorModel
      .find({ members: { $in: user._id } })
      .populate('owner', this.userService.unpopulatedFields);
  }

  getPublicSponsors() {
    return this.sponsorModel
      .find()
      .populate('owner', this.userService.unpopulatedFields);
  }

  getSponsorsByOwner(user: User) {
    return this.sponsorModel.find({ owner: user._id });
  }

  getSockets(sponsor: Sponsor) {
    return this.sponsorGateway.server.in(`sponsor_${sponsor._id}`).allSockets();
  }

  subscribeSocket(socket: Socket, sponsor: Sponsor) {
    return socket.join(`sponsor_${sponsor._id}`);
  }

  unsubscribeSocket(socket: Socket) {
    const sponsor = getSocketClient(socket).room;

    if (!sponsor) {
      return;
    }

    return socket.leave(`sponsor_${sponsor._id}`);
  }

  sendMessage<T>(sponsor: Sponsor, event: string, message?: T) {
    return this.sponsorGateway.server
      .to(`sponsor_${sponsor._id}`)
      .emit(event, message);
  }

  sendMessageExcept<T>(
    except: Socket,
    sponsor: Sponsor,
    event: string,
    message: T
  ) {
    return except.broadcast.to(`sponsor_${sponsor._id}`).emit(event, message);
  }

  async join(sponsorId: string, user: User) {
    const sponsor = await this.validateSponsor(sponsorId);

    if (!sponsor.members.some((member) => user.id === member.id)) {
      sponsor.members.push(user._id);

      this.handleJoinSponsor(user, sponsor);

      return sponsor.save();
    }

    return sponsor
      .populate('members', this.userService.unpopulatedFields)
      .execPopulate();
  }

  handleJoinSponsor(user: User, sponsor: Sponsor) {
    this.sendMessage(
      sponsor,
      'sponsor:join',
      this.userService.filterUser(user)
    );
  }

  async leave(user: User, sponsor: Sponsor) {
    remove(sponsor.members, (member) => member.id === user.id);

    this.handleLeaveSponsor(user, sponsor);

    return sponsor.save();
  }

  handleLeaveSponsor(user: User, sponsor: Sponsor) {
    this.sendMessage(
      sponsor,
      'sponsor:leave',
      this.userService.filterUser(user)
    );
  }
}
