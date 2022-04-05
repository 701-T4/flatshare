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
  rent: number; //represents the total rent per unit time to rent the house.

  @Prop()
  maxOccupants: number;

  @Prop({ unique: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Array<Types.ObjectId> = [];

  @Prop({ type: Types.ObjectId, ref: 'Announcement' })
  latestAnnouncement?: Types.ObjectId; //contains a reference to the most recently created announcement from the house.
}

export const HouseSchema = SchemaFactory.createForClass(House);

export class HouseModel {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  rent: number;
  maxOccupants: number;
  code: string;
  owner: Types.ObjectId;
  users: Array<Types.ObjectId> = [];
  latestAnnouncement?: Types.ObjectId;
}
