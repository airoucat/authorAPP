import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import * as util from 'util';
import { logger } from '../middleware/logging.middleware';

import { JWT_EXPIRATION_TIME } from '../common/constants';
import { copyExistingPropertiesInHelpful } from '../common/helpful';
import { UserService } from '../service/user.service';
import {
  LoginUser,
  UserInfo,
  TokenUserInfo,
} from '../interfaces/user.interface';
import { Document, Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async validateUser(loginUserDto: LoginUser): Promise<UserInfo> {
    logger.info({ message: 'AuthService.validateUser() Called.' });
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

    const isValidPwd = password === user.password; // ###! 密码应该要加密，后面需要换方法
    if (!isValidPwd) {
      throw new BadRequestException('password is not valid!');
    }
    const userinfo: UserInfo = {
      _id: new Types.ObjectId(),
      username: '',
      editStatus: {
        editing: {
          bookID: '',
          volumeID: '',
          chapterID: '',
        },
      },
    };
    const sanitizedUser: UserInfo = {
      ...copyExistingPropertiesInHelpful(userinfo, user.toObject()),
      // 关于 toObject()
      //#region
      /* ###?
      使用的是 Mongoose，它会在存储到数据库中的文档对象上添加一些属性和方法,如若不用toObject()，结构会是这样：
      {
        '$__': { ... },
        '$isNew': ...,
        _doc: {
          ...
        }
      }

      $__：一个包含有关文档的原始状态和其他有关文档状态的属性和方法的对象。
      $isNew：一个布尔值，指示文档是否是新创建的（由 save() 创建）。
      _doc：包含文档的所有原始字段值的 JavaScript 对象。

      */
      //#endregion
    };
    logger.info({ message: 'AuthService.validateUser() completed.' });
    return sanitizedUser;
  }

  async login(username: string, password: string) {
    logger.info({ message: 'AuthService.login() Called.' });
    try {
      const validateUser = await this.validateUser({ username, password })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((error) => {
          throw error;
        });
      const now = Math.floor(Date.now() / 1000);
      const exp = now + Number(JWT_EXPIRATION_TIME);
      const tokenData: TokenUserInfo = {
        _id: validateUser._id,
        username: validateUser.username,
      };
      const payload = tokenData;
      const token = this.jwtService.sign(payload);
      /* ###!
      这里有问题，
      const token = this.jwtService.sign(payload, {...});如若省去{...},例如
      {
        secret: process.env.JWT_KEY,
        algorithm: 'HS256',
      }
      则生成的token的secretOrKey还是之前设置的旧的‘secretKey’而非当前的process.env.JWT_KEY
      按理来说在JwtStrategy设置一次便好无需在此处重复
      得到的建议是尝试使用 Node.js 的内置 crypto 模块来实现加密和解密操作，而非使用 JWT 库，确保完全控制了生成和验证 JWT 的过程
      更新:
      经查明是没注意到AuthModule里的JwtModule.register()部分，误以为更改key只需更改JwtStrategy中的即可
      更新:
      现在认为key或者其它与程序运行无关的均放在common/constants更好，更方便管理与使用，
      故process.env.JWT_KEY统一换成common/constants.JWT_KEY
      */

      //#region
      /* ###?
      JWT 常用的负载键/值对
      iss（issuer）：表示 JWT 的签发者。
      sub（subject）：表示 JWT 所面向的用户。
      aud（audience）：表示 JWT 的接受者。
      exp（expiration time）：表示 JWT 的过期时间。
      nbf（not before time）：表示 JWT 的生效时间。
      iat（issued at time）：表示 JWT 的签发时间。
      jti（JWT ID）：表示 JWT 的唯一标识符。

      其中exp表示绝对时间戳，而sign()方法第三个参数中的expiresIn属性代表相对时间

      */
      //#endregion
      logger.info({ message: 'AuthService.login() completed.' });
      return {
        accessToken: token,
        expiresIn: exp,
        user: validateUser,
      };
    } catch (error) {
      logger.error({ message: 'AuthService.login() Error Occured:' });
      logger.error(util.inspect(error, { depth: Infinity }));
      throw error;
    }

    /*  */
  }
}
