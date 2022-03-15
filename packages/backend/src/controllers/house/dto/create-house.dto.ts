import { ApiProperty } from '@nestjs/swagger';
import { HouseModel } from '../../../db/house/house.schema';
import { Types } from 'mongoose';

export class CreateHouseDto extends HouseModel {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  users: Array<Types.ObjectId>;
}
