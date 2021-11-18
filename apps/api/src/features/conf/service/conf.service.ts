import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { getSocketClient } from '../../../shared/utils/get-socket-client';
import { MessageService } from '../../messages/service/message.service';
import { SponsorService } from '../../sponsor/service/sponsor.service';
import { UserService } from '../../user/service/user.service';
import { ConfGateway } from '../gateway/conf.gateway';
import { remove } from '../../../shared/utils/remove';
import { User } from '../../user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Conf } from '../schema/conf.schema';
import { ConfDto } from '../dto/conf.dto';
import { Socket } from 'socket.io';

@Injectable()
export class ConfService {
  private blockedFields: (keyof Conf)[] = ['members', 'owner'];

  unpopulatedFields = '-' + this.blockedFields.join(' -');

  constructor(
    @InjectModel(Conf.name) private confModel: Model<Conf>,
    private confGateway: ConfGateway,
    private userService: UserService,
    private sponsorService: SponsorService,
    @Inject(forwardRef(() => MessageService))
    private messageService: MessageService
  ) {}

  async create(conf: ConfDto, user: User) {
    const object = await this.confModel.create({ ...conf, owner: user._id });

    return object
      .populate('owner', this.userService.unpopulatedFields)
      .execPopulate();
  }

  async update(conf: Conf, body: UpdateQuery<Conf>, user: User) {
    this.handleUpdateConf(conf, body as Conf);

    return this.confModel
      .findOneAndUpdate({ _id: conf._id, owner: user._id }, body)
      .populate('owner', this.userService.unpopulatedFields);
  }

  handleUpdateConf(conf: Conf, body: Partial<Conf>) {
    this.sendMessage(conf, 'conf:update', Object.assign(conf, body));
  }

  delete(conf: Conf, user: User) {
    this.handleDeleteConf(conf);

    return Promise.all([
      this.confModel.findOneAndDelete({ _id: conf._id, owner: user._id }),
      this.messageService.deleteRoomMessages(conf),
    ]);
  }

  handleDeleteConf(conf: Conf) {
    this.sendMessage(conf, 'conf:delete', conf);
  }

  getConfByIdAndOwner(confId: string, owner: User) {
    return this.confModel
      .findOne({ _id: confId, owner: owner._id })
      .populate('members', this.userService.unpopulatedFields)
      .populate('sponsors', this.sponsorService.unpopulatedFields)
      .populate('owner', this.userService.unpopulatedFields);
  }

  async validateConfByIdAndOwner(confId: string, owner: User) {
    const conf = await this.getConfByIdAndOwner(confId, owner);

    if (!conf) {
      throw new NotFoundException('Conf não encontrada');
    }

    return conf;
  }

  getConf(confId: string) {
    return this.confModel
      .findById(confId)
      .populate('members', this.userService.unpopulatedFields)
      .populate('sponsors', this.sponsorService.unpopulatedFields)
      .populate('owner', this.userService.unpopulatedFields);
  }

  async validateConf(confId: string) {
    const conf = await this.getConf(confId);

    if (!conf) {
      throw new NotFoundException('Conf não encontrada');
    }

    return conf;
  }

  getConfsByMember(user: User) {
    return this.confModel
      .find({ members: { $in: user._id } })
      .populate('owner', this.userService.unpopulatedFields);
  }

  getConfsBySponsor(sponsorId: string) {
    return this.confModel
      .find({ sponsors: { $in: sponsorId } })
      .populate('sponsors', this.sponsorService.unpopulatedFields)
      .populate('owner', this.userService.unpopulatedFields);
  }

  getPublicConfs() {
    return this.confModel
      .find({ isPublic: true })
      .populate('owner', this.userService.unpopulatedFields);
  }

  getConfsByOwner(user: User) {
    return this.confModel.find({ owner: user._id });
  }

  getSockets(conf: Conf) {
    return this.confGateway.server.in(`conf_${conf._id}`).allSockets();
  }

  subscribeSocket(socket: Socket, conf: Conf) {
    return socket.join(`conf_${conf._id}`);
  }

  unsubscribeSocket(socket: Socket) {
    const conf = getSocketClient(socket).room;

    if (!conf) {
      return;
    }

    return socket.leave(`conf_${conf._id}`);
  }

  sendMessage<T>(conf: Conf, event: string, message?: T) {
    return this.confGateway.server.to(`conf_${conf._id}`).emit(event, message);
  }

  sendMessageExcept<T>(except: Socket, conf: Conf, event: string, message: T) {
    return except.broadcast.to(`conf_${conf._id}`).emit(event, message);
  }

  async join(confId: string, user: User) {
    const conf = await this.validateConf(confId);

    if (!conf.members.some((member) => user.id === member.id)) {
      conf.members.push(user._id);

      this.handleJoinConf(user, conf);

      return conf.save();
    }

    return conf
      .populate('members', this.userService.unpopulatedFields)
      .execPopulate();
  }

  handleJoinConf(user: User, conf: Conf) {
    this.sendMessage(conf, 'conf:join', this.userService.filterUser(user));
  }

  async leave(user: User, conf: Conf) {
    remove(conf.members, (member) => member.id === user.id);

    this.handleLeaveConf(user, conf);

    return conf.save();
  }

  handleLeaveConf(user: User, conf: Conf) {
    this.sendMessage(conf, 'conf:leave', this.userService.filterUser(user));
  }
}
