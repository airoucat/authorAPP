import { Body, Controller, Get, Put, Logger, Res } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { UserService } from 'src/service/user.service';
import { logger } from '../middleware/logging.middleware';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('create')
  async createUser(@Body() signInData, @Res() response: Response) {
    logger.info({ message: 'UserController.createUser Called.' });
    const res = await this.userService.create(signInData);
    logger.info({ message: 'UserController.createUser completed.' });
    response.status(201).json(res);
  }
}
