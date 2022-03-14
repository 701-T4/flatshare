import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskModel } from '../../../db/task/task.schema';

export class CreateTaskDto extends TaskModel {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiPropertyOptional()
  readonly last_completed: Date;

  @ApiProperty()
  readonly due_date: Date;

  @ApiPropertyOptional()
  readonly interval: number;

  @ApiProperty()
  readonly pool: string[];
}
