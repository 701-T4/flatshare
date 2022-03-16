import { ApiProperty } from '@nestjs/swagger';
import UserResponseDto from 'src/controllers/users/dto/user-response.dto';

export default class HouseResponseDto {
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  address: string;
  @ApiProperty({ required: true })
  code: string;
  @ApiProperty({ required: true })
  owner: string;
  @ApiProperty({ required: true })
  users: UserResponseDto[];
}
