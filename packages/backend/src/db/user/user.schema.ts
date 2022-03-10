import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'House' })
  house: MongooseSchema.Types.ObjectId;

  @Prop()
  firebaseId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserModel {
  readonly name: string;
  readonly age: number;
  house: MongooseSchema.Types.ObjectId;
  firebaseId: string;
}
