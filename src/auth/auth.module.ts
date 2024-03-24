import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../module/user.module';
import { JwtStrategy } from './jwt.strategy';

import { JWT_KEY } from '../common/constants';

console.log(JWT_KEY);

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

/*     
JwtModule.registerAsync({
  imports: [],
  useFactory: async () => ({
    secret: process.env.JWT_KEY,
  }),
  inject: [],a
}), 
 ###? 
 如果想用环境变量设置secret，会发现用register则无法获取环境变量，
 猜测可能是初始化早于环境变量加载，换异步的registerAsync后会等待环境变量加载

*/

/* ###! 
  现在是cookie管理登录，是否可以考虑换用session
*/
