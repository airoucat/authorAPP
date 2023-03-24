import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { API_APP_EXAMPLE } from '../common/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(API_APP_EXAMPLE)
  getHello(): string {
    console.log('this');
    return this.appService.getHello();
  }
}
