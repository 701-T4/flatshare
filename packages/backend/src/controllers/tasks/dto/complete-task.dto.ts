import { ApiProperty } from '@nestjs/swagger';

export class CompleteTaskDto {
  @ApiProperty()
  readonly isComplete: boolean;
}
