import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isComplete: boolean;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  interval: number;

  @ApiProperty()
  assigned: string;

  @ApiProperty()
  pool: string[];
}
