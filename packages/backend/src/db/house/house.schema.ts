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

  @Prop()
  code: string;

  //https://docs.nestjs.com/techniques/mongodb
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  users: User[];
}

export const HouseSchema = SchemaFactory.createForClass(House);

export class HouseModel {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  code: string;
  readonly users: User[];
}
