import { Body, Controller, Get, Post, Logger } from '@nestjs/common';
import { ExaService } from '../service/example.service';
import { API_APP_EXAMPLE } from '../common/constants';
import { Exa } from '../interfaces/exa.interface';

@Controller()
export class ExaController {
  constructor(private readonly exaService: ExaService) {}

  private readonly logger = new Logger(ExaController.name);

  @Get(`${API_APP_EXAMPLE}/exa`)
  async getHello() {
    this.logger.log('getData,controller');
    return this.exaService.getHello();
  }

  @Post(`${API_APP_EXAMPLE}/exa`)
  async postExa(@Body() CreateExaDto) {
    console.log(CreateExaDto);
    return this.exaService.create(CreateExaDto);
  }
}
