import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { User } from '../../user/schema/user.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Conf extends Document {
  @ApiProperty({
    type: String,
  })
  @Prop({
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  @Prop()
  description: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @Prop({
    required: true,
  })
  slug: string;

  @ApiProperty({
    type: [
      {
        type: ObjectId,
        ref: User.name,
      },
    ],
  })
  @Prop({
    type: [
      {
        type: ObjectId,
        ref: User.name,
      },
    ],
  })
  members: User[];

  @ApiProperty({
    type: ObjectId,
  })
  @Prop({
    type: ObjectId,
    ref: User.name,
  })
  owner: User;

  @ApiProperty({
    type: Date,
    required: true,
  })
  @Prop({
    type: Date,
    required: true,
  })
  start: Date;

  @ApiProperty({
    type: Date,
    required: true,
  })
  @Prop({
    type: Date,
    required: true,
  })
  end: Date;

  @ApiProperty({
    type: Date,
  })
  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    type: Boolean,
    required: true,
  })
  isPublic: boolean;
}

export const ConfSchema = createSchemaForClassWithMethods(Conf);
