import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskDocument } from '../../../db/task/task.schema';

export default class HouseTasksResponseDto {
  @ApiPropertyOptional()
  tasks: TaskDocument[];
}
