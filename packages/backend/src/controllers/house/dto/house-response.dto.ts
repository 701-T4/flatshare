import { ApiProperty } from '@nestjs/swagger';

export default class HouseResponseDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ required: false })
  code: string;
  @ApiProperty({ required: false })
  owner: string;
}
