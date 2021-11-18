import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { User } from '../../user/schema/user.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Talk extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  cover: string;

  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  bio: string;

  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop()
  group: string;

  @Prop()
  stage: string;

  @Prop()
  ytid: string;

  @Prop({ type: [{ type: ObjectId, ref: User.name }] })
  members: User[];

}

export const TalkSchema = createSchemaForClassWithMethods(Talk);
