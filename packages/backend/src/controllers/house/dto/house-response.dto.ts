import { ApiProperty } from '@nestjs/swagger';

export default class HouseResponseDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  owner: string;
}
