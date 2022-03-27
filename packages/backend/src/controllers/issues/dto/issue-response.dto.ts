import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class IssueResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  house: Types.ObjectId;

  @ApiProperty()
  logger: Types.ObjectId;

  @ApiPropertyOptional()
  loggedDate: Date;

  @ApiProperty()
  resolved: boolean;
}

export class IssuesResponseDto {
  @ApiProperty({
    type: [IssueResponseDto],
  })
  issues: IssueResponseDto[];
}
