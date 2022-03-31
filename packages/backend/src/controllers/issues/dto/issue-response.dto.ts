import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IssueResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  logger: string;

  @ApiPropertyOptional()
  loggedDate: number;

  @ApiProperty()
  resolved: boolean;
}

export class IssuesResponseDto {
  @ApiProperty({
    type: [IssueResponseDto],
  })
  issues: IssueResponseDto[];
}
