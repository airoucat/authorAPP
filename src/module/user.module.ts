import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from '../schemas/user.schema';
import { UserController } from '../controller/user.controller';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 如果想要其他的模块使用该服务，需要将该提供者导出
})
export class UserModule {}
