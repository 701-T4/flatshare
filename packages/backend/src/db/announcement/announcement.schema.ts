import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnnouncementDocument = Announcement & Document;

@Schema({ timestamps: true })
export class Announcement {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop()
  houseCode: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);

export class AnnouncementModel {
  title: string;
  description: string;
  author: Types.ObjectId;
  houseCode: string;
}
