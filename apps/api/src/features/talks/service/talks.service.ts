import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Talk } from '../schema/talk.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class TalksService {
  private blockedFields: (keyof Talk)[] = [];

  constructor(@InjectModel(Talk.name) private talkModel: Model<Talk>) {}

  findAll() {
    return this.talkModel.find();
  }

  remove(id: ObjectId | string) {
    return this.talkModel.findByIdAndRemove(id);
  }

  getTalkById(id: ObjectId | string) {
    return this.talkModel.findById(id);
  }

  update(talk: Talk, data: UpdateQuery<Talk>) {
    return this.talkModel.findByIdAndUpdate(talk._id, data);
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
}
