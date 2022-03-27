import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IssueDocument = Issue & Document;

@Schema()
export class Issue {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'House' })
  house: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  logger: Types.ObjectId;

  @Prop()
  loggedDate: Date;

  @Prop()
  resolved: boolean;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);

export class IssueModel {
  name: string;
  description: string;
  house: Types.ObjectId;
  logger: Types.ObjectId;
  loggedDate: Date;
  resolved: boolean;
}
