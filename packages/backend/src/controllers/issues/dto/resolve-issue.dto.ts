import { ApiProperty } from '@nestjs/swagger';

export class ResolveIssueDto {
  @ApiProperty()
  resolved: boolean;
}
