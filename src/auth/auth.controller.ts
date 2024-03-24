import { Controller, Put, Body, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { logger } from '../middleware/logging.middleware';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('/login')
  @Public()
  async login(@Req() req, @Res() res: Response) {
    logger.info({ message: 'AuthController.login() Called.' });
    const user = req.body;
    const data = await this.authService.login(user.username, user.password);
    logger.info({ message: 'AuthController.login() completed.' });
    res.send({ data: data });
  }
}
