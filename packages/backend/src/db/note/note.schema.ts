import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;
export enum NoteContents {
  PLAIN = 'PLAIN',
  SECRET = 'SECRET',
  WIFI = 'WIFI',
}

@Schema()
export class Note {
  @Prop()
  name: string;

  @Prop()
  value: string;

  @Prop()
  type: NoteContents;

  @Prop({ type: Types.ObjectId, ref: 'House' })
  house: Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

export class NoteModel {
  readonly name: string;
  value: string;
  readonly type: NoteContents;
  house: Types.ObjectId;
}
