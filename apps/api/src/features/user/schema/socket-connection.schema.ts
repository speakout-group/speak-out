import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document } from 'mongoose';

@Schema()
export class SocketConnection extends Document {
  @Prop()
  socketId: string;

  @Prop()
  serverHostname: string;

  @Prop()
  serverPort: number;

  @Prop({ type: ObjectId, ref: User.name })
  user: User;
}

export const SocketConnectionSchema =
  createSchemaForClassWithMethods(SocketConnection);
