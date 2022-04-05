import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * This class represents the output object to be returned
 * when an Announcement is requested through the API.
 * This DTO additionally contains a dateCreated field,
 * and contains an author name rather than an ID.
 */
export class AnnouncementResponseDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  houseCode: string;

  @ApiProperty()
  dateCreated: Date;
}

export class AnnouncementsResponseDto {
  @ApiProperty({
    type: [AnnouncementResponseDto],
  })
  announcements: AnnouncementResponseDto[];
}
