import { ApiPropertyOptional } from '@nestjs/swagger';

export default class UpdateHouseTasksDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  pool: string[];
}
