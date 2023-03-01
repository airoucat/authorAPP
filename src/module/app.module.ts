import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { DatabaseModule } from './database.module';
import { ExaModule } from './example.module';

@Module({
  imports: [DatabaseModule, ExaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
