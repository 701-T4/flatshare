import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class HouseResponseDto {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  address: string;
  @ApiPropertyOptional()
  code: string;
  @ApiPropertyOptional()
  owner: string;
}
