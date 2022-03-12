import { ApiProperty } from '@nestjs/swagger';

export default class UserResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  house: string;

  @ApiProperty()
  firebaseId: string;
}
