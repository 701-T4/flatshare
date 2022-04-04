import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class UpdateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  firebaseId: string;

  @ApiPropertyOptional()
  house?: string;

  @ApiPropertyOptional()
  rentPercentage?: number;

  @ApiPropertyOptional()
  contact?: string;

  @ApiPropertyOptional()
  dateJoined?: Date;

  @ApiPropertyOptional()
  contractEndingDate?: Date;
}
