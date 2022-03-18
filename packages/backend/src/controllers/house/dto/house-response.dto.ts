
import { ApiProperty } from '@nestjs/swagger';
import UserResponseDto from 'src/controllers/users/dto/user-response.dto';


export default class HouseResponseDto {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  address: string;
  @ApiProperty({ required: true })
  code: string;
  @ApiProperty({ required: true })
  owner: string;
  @ApiProperty({ required: true })
  users: UserResponseDto[];
}
