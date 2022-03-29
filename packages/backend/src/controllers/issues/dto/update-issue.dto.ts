import { ApiProperty } from '@nestjs/swagger';

export class UpdateIssueDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  resolved: boolean;
}
