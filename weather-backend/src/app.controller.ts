import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/query')
  query(@Query() query): any {
    return this.appService.getWeatherByCode(query.code);
  }
}
