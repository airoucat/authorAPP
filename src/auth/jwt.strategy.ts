import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_KEY } from '../common/constants';

import { UserService } from '../service/user.service';
import { TokenUserInfo } from 'src/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_KEY,
      algorithm: ['HS256'],
    });
  }

  async validate(payload: TokenUserInfo) {
    // ###! 目前不完善，或许可以在这里做权限区分
    await this.userService.setCurrentUser(payload);
    return payload;
  }
}
