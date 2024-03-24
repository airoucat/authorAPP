import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongodb.modules';

@Module({
  imports: [MongoModule],
})
export class DatabaseModule {}
