import { Body, Controller, Get, Param, Res, Put } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { BookService } from 'src/service/book.service';
import { logger } from '../middleware/logging.middleware';
import { createBookInfo } from '../interfaces/book.interface';
import { Response } from 'express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Put('create')
  async createBook(
    @Body() createBookData: createBookInfo,
    @Res() response: Response,
  ) {
    logger.info({ message: 'bookController.createBook Called.' });
    const res = await this.bookService.create(createBookData);
    logger.info({ message: 'bookController.createBook completed.' });
    response.status(201).json(res);
  }

  @Get('list')
  async getBookList(@Res() response: Response) {
    logger.info({ message: 'bookController.getBookList Called.' });
    const res = await this.bookService.list();
    logger.info({ message: 'bookController.getBookList completed.' });
    response.status(201).json({
      list: res,
    });
  }

  @Get(':id')
  async getBook(@Param('id') id: string, @Res() response: Response) {
    logger.info({ message: 'bookController.getBook Called.' });
    const res = await this.bookService.getOne(id);
    logger.info({ message: 'bookController.getBook completed.' });
    response.status(201).json({
      data: res,
    });
  }
}
