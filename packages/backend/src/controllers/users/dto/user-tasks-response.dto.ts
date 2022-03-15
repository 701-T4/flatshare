import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskDocument } from '../../../db/task/task.schema';

export default class UserTasksResponseDto {
  @ApiPropertyOptional()
  tasks: TaskDocument[];
}
