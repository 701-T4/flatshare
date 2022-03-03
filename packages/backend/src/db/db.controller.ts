import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SampleService } from './db.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { Sample } from './schemas/sample.schema';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async create(@Body() createSampleDto: CreateSampleDto) {
    await this.sampleService.create(createSampleDto);
  }

  @Get()
  async findAll(): Promise<Sample[]> {
    return this.sampleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sample> {
    return this.sampleService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.sampleService.delete(id);
  }
}
