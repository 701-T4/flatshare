import { ApiProperty } from '@nestjs/swagger';

export class CreateIssueDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  resolved: boolean;
}
