import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../service/app.service';
import { Public } from 'src/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    res.send({});
    // return this.appService.getHello();
  }
}
