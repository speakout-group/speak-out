import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { User } from '../../user/schema/user.schema';
import { Conf } from '../../conf/schema/conf.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Sponsor extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;

  @Prop()
  slug: string;

  @Prop()
  color: string;

  @Prop()
  website: string;

  @Prop()
  youtube: string;

  @Prop({
    type: [
      {
        type: ObjectId,
        ref: User.name,
      },
    ],
  })
  members: User[];

  @ApiProperty()
  @Prop({
    type: ObjectId,
    ref: Conf.name,
  })
  conf: Conf;

  @Prop({
    type: ObjectId,
    ref: User.name,
  })
  owner: User;
}

export const SponsorSchema = createSchemaForClassWithMethods(Sponsor);
