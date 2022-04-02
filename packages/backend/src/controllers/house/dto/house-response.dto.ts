import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import UserResponseDto from '../../../controllers/users/dto/user-response.dto';
import { AnnouncementResponseDto } from '../../announcements/dto/announcement-response.dto';

export default class HouseResponseDto {
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  address: string;
  @ApiPropertyOptional()
  rent: number;
  @ApiPropertyOptional()
  maxOccupants: number;
  @ApiProperty({ required: true })
  code: string;
  @ApiProperty({ required: true })
  owner: string;
  @ApiProperty({ required: true, type: [UserResponseDto] })
  users: UserResponseDto[];
  @ApiPropertyOptional()
  latestAnnouncement?: AnnouncementResponseDto;
}
