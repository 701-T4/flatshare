import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  name: string;

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
