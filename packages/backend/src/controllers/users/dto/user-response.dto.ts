import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class UserResponseDto {
  @ApiProperty()
  name?: string;

  @ApiPropertyOptional()
  house?: string;

  @ApiProperty()
  firebaseId: string;
}
