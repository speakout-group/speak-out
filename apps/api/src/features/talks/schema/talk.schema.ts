import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Talk extends Document {
  @Prop()
  photo: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  name: string;

  @Prop()
  bio: string;

  @Prop()
  group: string;
}

export const TalkSchema = createSchemaForClassWithMethods(Talk);