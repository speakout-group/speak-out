import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { Conf } from '../../conf/schema/conf.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Speaker extends Document {
  @ApiProperty({
    required: true,
  })
  @Prop({
    required: true,
  })
  name: string;

  @ApiProperty()
  @Prop()
  bio: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop({
    type: ObjectId,
    ref: Conf.name,
  })
  conf: Conf;

  @ApiProperty()
  @Prop()
  order: number;

  @ApiProperty({
    required: true,
  })
  @Prop({
    type: Date,
    required: true,
  })
  start: Date;

  @ApiProperty({
    required: true,
  })
  @Prop({
    type: Date,
    required: true,
  })
  end: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}

export const SpeakerSchema = createSchemaForClassWithMethods(Speaker);
