import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'House' })
  house: MongooseSchema.Types.ObjectId;

  @Prop({ unique: true })
  firebaseId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserModel {
  house: MongooseSchema.Types.ObjectId;
  firebaseId: string;
}
