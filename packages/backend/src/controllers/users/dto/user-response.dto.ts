import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class UserResponseDto {
  @ApiProperty()
  name?: string;

  @ApiPropertyOptional()
  house?: string;

  @ApiProperty()
  firebaseId: string;

  @ApiPropertyOptional()
  rentPercentage?: number;

  @ApiPropertyOptional()
  contact?: string;

  @ApiPropertyOptional()
  dateJoined?: Date;

  @ApiPropertyOptional()
  contractEndingDate?: Date;
}
