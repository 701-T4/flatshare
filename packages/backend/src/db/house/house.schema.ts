import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';

export type HouseDocument = House & Document;

@Schema()
export class House {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop({ unique: true })
  code: string;

  @Prop()
  owner: string;
}

export const HouseSchema = SchemaFactory.createForClass(House);

export class HouseModel {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  code: string;
  owner: string;
}
