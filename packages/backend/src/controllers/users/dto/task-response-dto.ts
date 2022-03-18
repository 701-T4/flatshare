import { ApiProperty } from '@nestjs/swagger';
import { TaskModel } from '../../../db/task/task.schema';
import { Types } from 'mongoose';

export class TaskResponseDto {
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
