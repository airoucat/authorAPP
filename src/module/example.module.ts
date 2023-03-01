import { Module } from '@nestjs/common';
import { ExaController } from '../controller/example.controller';
import { ExaService } from '../service/example.service';
import { ExampleProviders } from '../providers/example.providers';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExaController],
  providers: [ExaService, ...ExampleProviders],
})
export class ExaModule {}
