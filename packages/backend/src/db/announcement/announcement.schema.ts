import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnnouncementDocument = Announcement & Document;

@Schema({ timestamps: true })
export class Announcement {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  houseCode: string;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);

export class AnnouncementModel {
  title: string;
  description: string;
  author: string;
  houseCode: string;
}
