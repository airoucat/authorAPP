import { Module } from '@nestjs/common';
import { DatabaseProviders } from '../providers/mongoose.providers';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule {}
