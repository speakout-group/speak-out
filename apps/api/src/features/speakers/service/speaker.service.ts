import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { ConfService } from '../../conf/service/conf.service';
import { UserService } from '../../user/service/user.service';
import { Conf } from '../../conf/schema/conf.schema';
import { Speaker } from '../schema/speaker.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectModel(Speaker.name) private speakerModel: Model<Speaker>,
    @Inject(forwardRef(() => ConfService)) private confService: ConfService,
    private userService: UserService
  ) {}

  getSpeaker(id: string) {
    return this.speakerModel.findById(id);
  }

  async validateSpeaker(id: string) {
    const speaker = await this.getSpeaker(id);

    if (!speaker) {
      throw new NotFoundException('Palestrante não encontrado');
    }

    return speaker;
  }

  getPopulatedSpeaker(id: string) {
    return this.speakerModel.findById(id).populate('conf');
  }

  async validatePopulatedSpeaker(id: string) {
    const speaker = await this.getPopulatedSpeaker(id);

    if (!speaker) {
      throw new NotFoundException('Palestrante não encontrado');
    }

    return speaker;
  }

  getConfSpeakers(conf: Conf) {
    return this.speakerModel.find({ conf: conf._id });
  }

  async getNextConfSpeakers(conf: Conf, limit?: number, before?: Date) {
    const filter: FilterQuery<Speaker> = {
      conf: conf._id,
      start: { $lte: before },
    };

    if (!before) {
      delete filter.start;
    }

    return this.getSpeakers(filter, limit);
  }

  private async getSpeakers(filter: FilterQuery<Speaker>, limit: number) {
    return this.sortSpeakers(
      await this.speakerModel.find(filter).limit(limit).sort({ start: -1 })
    );
  }

  sortSpeakers(speakers: Speaker[]) {
    return speakers.sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  private getSpeakerFilter(start: Date, end: Date): FilterQuery<Speaker> {
    return {
      $or: [
        { start: start, end: end },
        { end: start, start: end },
      ],
    };
  }

  async createConfSpeaker(start: Date, conf: Conf, speaker: string) {
    const object = await this.speakerModel.create({
      start: start,
      conf: conf._id,
      speaker,
    });

    return object
      .populate('start', this.userService.unpopulatedFields)
      .execPopulate();
  }

  async deleteConfSpeaker(conf: Conf, speakerId: string) {
    this.confService.sendMessage(conf, 'conf:delete_speaker', speakerId);

    return this.speakerModel.findOneAndDelete({
      _id: speakerId,
      conf: conf._id,
    });
  }
}
