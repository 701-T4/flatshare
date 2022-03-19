import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskResponseDto } from './task-response-dto';

export default class HouseTasksResponseDto {
  @ApiPropertyOptional({
    type: [TaskResponseDto],
  })
  tasks: TaskResponseDto[];
}
