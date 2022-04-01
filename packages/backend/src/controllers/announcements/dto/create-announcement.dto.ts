import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
