import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskModel } from '../../../db/task/task.schema';

export class CreateTaskDto extends TaskModel {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly dueDate: Date;

  @ApiPropertyOptional()
  readonly interval: number;

  /**
   * The pool property represents a list of users who can be assgined a task
   */
  @ApiProperty()
  readonly pool: string[];
}
