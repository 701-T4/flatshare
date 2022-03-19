import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskResponseDto } from './task-response-dto';

export default class HouseTasksResponseDto {
  @ApiPropertyOptional()
  tasks: TaskResponseDto[];
}
