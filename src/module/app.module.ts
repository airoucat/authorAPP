import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { BookModule } from './book.mudule';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { loggingMiddleware } from '../middleware/logging.middleware';

import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, BookModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 全局守卫，无@public则验证token
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggingMiddleware).forRoutes('*');
  }
}
