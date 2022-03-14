import { ApiProperty } from '@nestjs/swagger';
import { TaskModel } from '../../../db/task/task.schema';

export class CreateTaskDto extends TaskModel {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ required: false })
  readonly last_completed: Date;

  @ApiProperty()
  readonly due_date: Date;

  @ApiProperty({ required: false })
  readonly interval: number;

  @ApiProperty()
  readonly pool: string[];
}
