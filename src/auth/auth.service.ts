import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /*   async validateUser(loginUserDto: LoginUserDto): Promise<UserStatusDTO> {
    const username = loginUserDto.username;
    const password = loginUserDto.password;
    if (_.isEmpty(username) || _.isEmpty(password)) {
      throw new BadRequestException('user is required!');
    }
    // 去数据库查找该user
    const user = await this.userService.findLoginUser(username);
    if (_.isEmpty(user)) {
      throw new BadRequestException('user not found!');
    }
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw new BadRequestException('password is not valid!');
    }
    const sanitizedUser = {
      id: user.id,
      username: user.username,
      memo_count: user.memo_count,
      day_count: user.day_count,
      tag_count: user.tag_count,
      month_sign_id: user.month_sign_id,
      last_login: user.last_login,
    };
    return sanitizedUser;
  } */

  async login(username: string, password: string) {
    // 在这里验证用户的账号密码，并设置有效期为 12 小时的 Token
    const payload = { username, password };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '12h' }),
    };
  }
}
