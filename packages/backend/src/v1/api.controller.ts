import { Controller, Get } from '@nestjs/common';

@Controller()
export class APIController {
  constructor() {}

  @Get('ping')
  getPing(): { time: Date } {
    return { time: new Date() };
  }
}
