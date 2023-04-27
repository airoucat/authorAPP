import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { DatabaseModule } from './database.module';
import { ExaModule } from './example.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [DatabaseModule, ExaModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // 全局守卫，非@public验证token
    },
  ],
})
export class AppModule {}
