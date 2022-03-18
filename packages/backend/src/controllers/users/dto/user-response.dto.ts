import { ApiProperty } from '@nestjs/swagger';

export default class UserResponseDto {
  @ApiProperty({ required: false })
  house: string;

  @ApiProperty()
  firebaseId: string;
}
