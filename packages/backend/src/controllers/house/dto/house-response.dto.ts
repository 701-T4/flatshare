import { ApiProperty } from '@nestjs/swagger';
import UserResponseDto from 'src/controllers/users/dto/user-response.dto';

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
  @ApiProperty({ required: false })
  users: UserResponseDto[];
}
