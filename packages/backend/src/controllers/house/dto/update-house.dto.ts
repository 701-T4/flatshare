import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export default class UpdateHouseDto {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  address: string;
  @ApiPropertyOptional()
  rent: string;
  @ApiPropertyOptional()
  maxOccupants: string;
  @ApiProperty({ required: true })
  code: string;
  @ApiPropertyOptional()
  owner: string;
  @ApiPropertyOptional()
  users: string[];
}
