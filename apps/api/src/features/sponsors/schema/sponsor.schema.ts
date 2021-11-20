import { createSchemaForClassWithMethods } from '../../../shared/mongoose/create-schema';
import { ObjectId } from '../../../shared/mongoose/object-id';
import { User } from '../../user/schema/user.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sponsor extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: false,
  })
  description: string;
  
  @Prop({
    type: String,
    required: true,
  })
  logo: string;
  
  @Prop({
    type: String,
    required: false,
  })
  website: string;
  
  @Prop({
    type: String,
    required: false,
  })
  youtube: string;
  
  @Prop({
    type: String,
    required: false,
  })
  linkedin: string;
  
  @Prop({
    type: String,
    required: false,
  })
  instagram: string;
  
  @Prop({
    type: String,
    required: false,
  })
  facebook: string;
  
  @Prop({
    type: String,
    required: false,
  })
  twitter: string;
  
  @Prop({
    type: String,
    required: false,
  })
  calendlyUrl: string;
  
  @Prop({
    type: String,
    required: false,
  })
  videoUrl: string;
  
  @Prop({
    type: String,
    required: false,
  })
  formUrl: string;

  @Prop({
    type: [
      {
        type: ObjectId,
        ref: User.name,
      },
    ],
  })
  members: User[];
}

export const SponsorSchema = createSchemaForClassWithMethods(Sponsor);
