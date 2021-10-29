import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document } from 'mongoose';

export enum SubscriptionType {
  Web = 'web',
  Mobile = 'mobile',
}

@Schema()
export class Subscription extends Document {
  @Prop({
    type: String,
    enum: Object.values(SubscriptionType),
  })
  type: SubscriptionType;

  @Prop()
  subscription: string;

  @Prop({ type: ObjectId, ref: User.name })
  user: User;
}

export const SubscriptionSchema = createSchemaForClassWithMethods(Subscription);
