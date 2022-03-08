import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { House } from '../house/house.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'House' })
  house: House;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserModel {
  readonly name: string;
  readonly age: number;
  readonly house: House;
}
