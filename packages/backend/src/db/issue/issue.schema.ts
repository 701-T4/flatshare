import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'House' })
  house: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  logger: Types.ObjectId;

  @Prop({ type: Date, default: new Date() })
  loggedDate: Date;

  @Prop({ default: false })
  resolved: boolean;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);

export class IssueModel {
  name: string;
  description: string;
  image: string;
  house: Types.ObjectId;
  logger: Types.ObjectId;
  loggedDate: Date;
  resolved: boolean;
}
