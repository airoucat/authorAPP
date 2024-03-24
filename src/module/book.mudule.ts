import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  BookBaseInfoSchema,
  BookVolumeChapterTreeSchema,
} from '../schemas/book.schema';
import { UserModule } from '../module/user.module';
import { BookController } from '../controller/book.controller';
import { BookService } from 'src/service/book.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'BookBaseInfo', schema: BookBaseInfoSchema },
      { name: 'BookVolumeChapter', schema: BookVolumeChapterTreeSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
