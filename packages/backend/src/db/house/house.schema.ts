import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: MongooseSchema.Types.ObjectId;
}

export const HouseSchema = SchemaFactory.createForClass(House);

export class HouseModel {
  readonly name: string;
  readonly email: string;
  readonly address: string;
  code: string;
  owner: MongooseSchema.Types.ObjectId;
}
