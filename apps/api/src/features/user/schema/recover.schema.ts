import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document } from 'mongoose';

@Schema()
export class Recover extends Document {
  @Prop()
  code: string;

  @Prop({ type: ObjectId, ref: User.name })
  owner: User;

  @Prop()
  expiration: Date;
}

export const RecoverSchema = createSchemaForClassWithMethods(Recover);
