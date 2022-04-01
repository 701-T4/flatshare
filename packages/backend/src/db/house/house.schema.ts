import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HouseDocument = House & Document;

@Schema()
export class House {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  rent: string;

  @Prop()
  maxOccupants: string;

  @Prop({ unique: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Array<Types.ObjectId> = [];

  @Prop({ type: Types.ObjectId, ref: 'Announcement' })
  latestAnnouncement?: Types.ObjectId;
}

export const HouseSchema = SchemaFactory.createForClass(House);

export class HouseModel {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  rent: string;
  maxOccupants: string;
  code: string;
  owner: Types.ObjectId;
  users: Array<Types.ObjectId> = [];
  latestAnnouncement?: Types.ObjectId;
}
