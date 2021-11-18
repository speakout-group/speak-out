import { Injectable, NotFoundException } from '@nestjs/common';
import { TalksGateway } from '../gateway/talks.gateway';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { getSocketClient } from '../../../shared/utils/get-socket-client';
import { MessageService } from '../../messages/service/message.service';
import { UserService } from '../../user/service/user.service';
import { remove } from '../../../shared/utils/remove';
import { Talk } from '../schema/talk.schema';
import { ObjectId } from 'mongodb';
import { Socket } from 'socket.io';

import { User } from '../../user/schema/user.schema';

@Injectable()
export class TalksService {
  private blockedFields: (keyof Talk)[] = [];

  constructor(
    @InjectModel(Talk.name) private talkModel: Model<Talk>,
    private talksGateway: TalksGateway,
    private userService: UserService,
  ) {}

  findAll() {
    return this.talkModel.find().sort({ start: 'asc' });
  }

  remove(id: ObjectId | string) {
    return this.talkModel.findByIdAndRemove(id);
  }

  getTalkById(id: ObjectId | string) {
    return this.talkModel.findById(id)
      .populate('members', this.userService.unpopulatedFields);
  }

  getTalksByMember(user: User) {
    return this.talkModel
      .find({ members: { $in: user._id } });
  }

  async update(talk: Talk, body: UpdateQuery<Talk>, user: User) {
    this.handleUpdateTalk(talk, body as Talk);

    return this.talkModel
      .findOneAndUpdate({ _id: talk._id, owner: user._id }, body);
  }

  handleUpdateTalk(talk: Talk, body: Partial<Talk>) {
    this.sendMessage(talk, 'talk:update', Object.assign(talk, body));
  }

  updateTalk(talk: Talk, data: UpdateQuery<Talk>) {
    return this.talkModel.findByIdAndUpdate(talk._id, data);
  }

  async validateTalkById(talkId: ObjectId | string) {
    const room = await this.getTalkById(talkId);

    if (!room) {
      throw new NotFoundException('Talk não encontrada');
    }

    return room;
  }

  filterTalk(talk: Talk, allowedFields: (keyof Talk)[] = []) {
    const talkObject = talk.toObject({ virtuals: true });

    for (const field of this.blockedFields) {
      if (allowedFields.includes(field)) {
        continue;
      }

      delete talkObject[field];
    }

    return talkObject;
  }

  async updateTalkObject(talk: Talk) {
    const newInput = await this.getTalkById(talk._id);

    return Object.assign(talk, newInput);
  }

  async create(body: Partial<Talk>) {
    const talk = await this.talkModel.create(body);

    return talk.save();
  }

  getSockets(talk: Talk) {
    return this.talksGateway.server.in(`talk_${talk._id}`).allSockets();
  }

  subscribeSocket(socket: Socket, talk: Talk) {
    return socket.join(`talk_${talk._id}`);
  }

  unsubscribeSocket(socket: Socket) {
    const talk = getSocketClient(socket).talk;

    if (!talk) {
      return;
    }

    return socket.leave(`talk_${talk._id}`);
  }

  sendMessage<T>(talk: Talk, event: string, message?: T) {
    return this.talksGateway.server.to(`talk_${talk._id}`).emit(event, message);
  }

  sendMessageExcept<T>(except: Socket, talk: Talk, event: string, message: T) {
    return except.broadcast.to(`talk_${talk._id}`).emit(event, message);
  }

  async join(talkId: string, user: User) {
    const talk = await this.validateTalkById(talkId);

    if (!talk.members.some((member) => user.id === member.id)) {
      talk.members.push(user.id);

      this.handleJoinTalk(user, talk);

      return talk.save();
    }

    return talk
      .populate('members', this.userService.unpopulatedFields)
      .execPopulate();
  }

  handleJoinTalk(user: User, talk: Talk) {
    this.sendMessage(talk, 'talk:join', this.userService.filterUser(user));
  }

  async leave(user: User, talk: Talk) {
    console.log(talk);
    console.log(user);
    
    remove(talk.members, (member) => member.id === user.id);

    this.handleLeaveTalk(user, talk);

    return talk.save();
  }

  handleLeaveTalk(user: User, talk: Talk) {
    this.sendMessage(talk, 'talk:leave', this.userService.filterUser(user));
  }
}
