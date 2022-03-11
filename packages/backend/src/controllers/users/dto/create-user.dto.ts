import { UserModel } from '../../../db/user/user.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends UserModel {
  house: MongooseSchema.Types.ObjectId;

  @ApiProperty()
  firebaseId: string;
}
