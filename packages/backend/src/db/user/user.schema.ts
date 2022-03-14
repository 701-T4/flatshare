import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'House' })
  house: Types.ObjectId;

  @Prop({ unique: true })
  firebaseId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserModel {
  name: string;
  house?: Types.ObjectId;
  firebaseId: string;
}
