import { getSocketClient } from '../../../shared/utils/get-socket-client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SponsorsGateway } from '../gateway/sponsors.gateway';
import { UserService } from '../../user/service/user.service';
import { remove } from '../../../shared/utils/remove';
import { Sponsor } from '../schema/sponsor.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Socket } from 'socket.io';

import { User } from '../../user/schema/user.schema';

@Injectable()
export class SponsorsService {
  private blockedFields: (keyof Sponsor)[] = [];

  constructor(
    @InjectModel(Sponsor.name) private sponsorModel: Model<Sponsor>,
    private sponsorsGateway: SponsorsGateway,
    private userService: UserService,
  ) {}

  findAll() {
    return this.sponsorModel.find().sort({ start: 'asc' });
  }

  remove(id: ObjectId | string) {
    return this.sponsorModel.findByIdAndRemove(id);
  }

  getSponsorById(id: ObjectId | string) {
    return this.sponsorModel.findById(id)
      .populate('members', this.userService.unpopulatedFields);
  }

  getSponsorsByMember(user: User) {
    return this.sponsorModel
      .find({ members: { $in: user._id } });
  }

  async update(sponsor: Sponsor, body: UpdateQuery<Sponsor>, user: User) {
    this.handleUpdateSponsor(sponsor, body as Sponsor);

    return this.sponsorModel
      .findOneAndUpdate({ _id: sponsor._id, owner: user._id }, body);
  }

  handleUpdateSponsor(sponsor: Sponsor, body: Partial<Sponsor>) {
    this.sendMessage(sponsor, 'sponsor:update', Object.assign(sponsor, body));
  }

  updateSponsor(sponsor: Sponsor, data: UpdateQuery<Sponsor>) {
    return this.sponsorModel.findByIdAndUpdate(sponsor._id, data);
  }

  async validateSponsorById(sponsorId: ObjectId | string) {
    const room = await this.getSponsorById(sponsorId);

    if (!room) {
      throw new NotFoundException('Sponsor não encontrada');
    }

    return room;
  }

  filterSponsor(sponsor: Sponsor, allowedFields: (keyof Sponsor)[] = []) {
    const sponsorObject = sponsor.toObject({ virtuals: true });

    for (const field of this.blockedFields) {
      if (allowedFields.includes(field)) {
        continue;
      }

      delete sponsorObject[field];
    }

    return sponsorObject;
  }

  async updateSponsorObject(sponsor: Sponsor) {
    const newInput = await this.getSponsorById(sponsor._id);

    return Object.assign(sponsor, newInput);
  }

  async create(body: Partial<Sponsor>) {
    const sponsor = await this.sponsorModel.create(body);

    return sponsor.save();
  }

  getSockets(sponsor: Sponsor) {
    return this.sponsorsGateway.server.in(`sponsor_${sponsor._id}`).allSockets();
  }

  subscribeSocket(socket: Socket, sponsor: Sponsor) {
    return socket.join(`sponsor_${sponsor._id}`);
  }

  unsubscribeSocket(socket: Socket) {
    const sponsor = getSocketClient(socket).sponsor;

    if (!sponsor) {
      return;
    }

    return socket.leave(`sponsor_${sponsor._id}`);
  }

  sendMessage<T>(sponsor: Sponsor, event: string, message?: T) {
    return this.sponsorsGateway.server.to(`sponsor_${sponsor._id}`).emit(event, message);
  }

  sendMessageExcept<T>(except: Socket, sponsor: Sponsor, event: string, message: T) {
    return except.broadcast.to(`sponsor_${sponsor._id}`).emit(event, message);
  }

  async join(sponsorId: string, user: User) {
    const sponsor = await this.validateSponsorById(sponsorId);

    if (!sponsor.members.some((member) => user.id === member.id)) {
      sponsor.members.push(user.id);

      this.handleJoinSponsor(user, sponsor);

      return sponsor.save();
    }

    return sponsor
      .populate('members', this.userService.unpopulatedFields)
      .execPopulate();
  }

  handleJoinSponsor(user: User, sponsor: Sponsor) {
    this.sendMessage(sponsor, 'sponsor:join', this.userService.filterUser(user));
  }

  async leave(user: User, sponsor: Sponsor) {
    console.log(sponsor);
    console.log(user);
    
    remove(sponsor.members, (member) => member.id === user.id);

    this.handleLeaveSponsor(user, sponsor);

    return sponsor.save();
  }

  handleLeaveSponsor(user: User, sponsor: Sponsor) {
    this.sendMessage(sponsor, 'sponsor:leave', this.userService.filterUser(user));
  }
}
