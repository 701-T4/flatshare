import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AnnouncementResponseDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  houseCode: string;
}

export class AnnouncementsResponseDto {
  @ApiProperty({
    type: [AnnouncementResponseDto],
  })
  issues: AnnouncementResponseDto[];
}
