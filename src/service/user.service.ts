import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User, TokenUserInfo } from '../interfaces/user.interface';
import { logger } from '../middleware/logging.middleware';
import * as util from 'util';

@Injectable()
export class UserService {
  private currentUser: TokenUserInfo;

  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async create(data: User): Promise<User> {
    logger.info({ message: 'userService.create() Called.' });
    try {
      const createdUser = new this.userModel(data);
      const res = await createdUser.save();
      logger.info({ message: 'userService.create() completed.' });
      return res;
    } catch (error) {
      logger.error({ message: 'userService.create() Error Occured:' });
      logger.error(util.inspect(error, { depth: Infinity }));
      throw new InternalServerErrorException();
    }
  }

  async findLoginUser(username: string) {
    logger.info({ message: 'userService.findLoginUser() Called.' });
    try {
      const user = await this.userModel.findOne({ username: username }).exec(); // ###! 还没有考虑到用户名重复情况的错误情况
      logger.info({ message: 'userService.findLoginUser() completed.' });
      return user;
    } catch (error) {
      logger.error({ message: 'userService.findLoginUser() Error Occured:' });
      logger.error(util.inspect(error, { depth: Infinity }));
      throw new InternalServerErrorException();
    }
  }

  async findLoginUserById(id: string) {
    logger.info({ message: 'userService.findLoginUserById() Called.' });
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      logger.info({ message: 'userService.findLoginUserById() completed.' });
      return user;
    } catch (error) {
      logger.error({
        message: 'userService.findLoginUserById() Error Occured:',
      });
      logger.error(util.inspect(error, { depth: Infinity }));
      throw new InternalServerErrorException();
    }
  }

  async setCurrentUser(user: TokenUserInfo) {
    // const findUser = await this.findLoginUserById(user._id.toString());

    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
