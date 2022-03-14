import { ApiProperty } from '@nestjs/swagger';
import { TaskDocument } from '../../../db/task/task.schema';

export default class HouseTasksResponseDto {
  @ApiProperty({ required: false })
  tasks: TaskDocument[];
}
