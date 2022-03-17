import { ApiProperty } from '@nestjs/swagger';
import { HouseModel } from '../../../db/house/house.schema';

export class CreateHouseDto extends HouseModel {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly address: string;
}
