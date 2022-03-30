import { ApiProperty } from '@nestjs/swagger';

export class CreateIssueDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  resolved: boolean;
}
