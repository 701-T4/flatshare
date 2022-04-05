import { ApiProperty } from '@nestjs/swagger';

/**
 * This class represents the data form for an Announcement
 * creation request.
 */
export class CreateAnnouncementDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
