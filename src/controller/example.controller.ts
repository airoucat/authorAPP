import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExaService } from '../service/example.service';
import { API_APP_EXAMPLE } from '../common/constants';
import { Exa } from '../interfaces/exa.interface';

@Controller()
export class ExaController {
  constructor(private readonly exaService: ExaService) {}

  @Get(`${API_APP_EXAMPLE}/exa`)
  getHello(): string {
    return this.exaService.getHello();
  }

  @Post(`${API_APP_EXAMPLE}/exa`)
  async postExa(@Body() CreateExaDto) {
    console.log(CreateExaDto);
    return this.exaService.create(CreateExaDto);
  }
}
