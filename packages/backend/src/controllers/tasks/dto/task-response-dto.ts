import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskModel } from '../../../db/task/task.schema';

export class TaskResponseDto extends TaskModel {}
