import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import {
  BookProgramInfo,
  BookVolumeChapterTree,
  createBookInfo,
} from '../interfaces/book.interface';
import { UserService } from '../service/user.service';
import { logger } from '../middleware/logging.middleware';
import * as util from 'util';
import { ObjectId } from 'mongodb';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('BookBaseInfo')
    private bookModel: Model<BookProgramInfo>,
    @InjectModel('BookVolumeChapter')
    private bookTreeModel: Model<BookVolumeChapterTree>,
    private readonly userService: UserService,
  ) {}

  async create(data: createBookInfo): Promise<BookProgramInfo> {
    logger.info({ message: 'bookService.create() Called.' });
    try {
      const user = this.userService.getCurrentUser();
      const existingUser = await this.bookModel.findOne({
        title: data.bookname,
      });
      if (existingUser) {
        throw new ConflictException('title already exists');
      }
      const temp = {
        title: data.bookname,
        createdBy: user._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const createdBook = new this.bookModel(temp);
      const res = await createdBook.save();
      const treeTemp = {
        _id: res.toObject()._id,
        bookName: data.bookname,
      };
      const createdBookTree = new this.bookTreeModel(treeTemp);
      const TreeRes = await createdBookTree.save();
      logger.info({ message: 'bookService.create() completed.' });
      return res;
    } catch (error) {
      logger.error({ message: 'bookService.create() Error Occured:' });
      logger.error(util.inspect(error, { depth: Infinity }));
      throw error;
    }
  }

  async list(): Promise<BookProgramInfo[]> {
    logger.info({ message: 'bookService.list() Called.' });
    try {
      const user = this.userService.getCurrentUser();
      const res = await this.bookModel
        .find({ createdBy: user._id })
        .sort({ updatedAt: 'desc' })
        .exec();
      logger.info({ message: 'bookService.list() completed.' });
      return res;
    } catch (error) {
      logger.error({ message: 'bookService.list() Error Occured:' });
      logger.error(util.inspect(error, { depth: Infinity }));
      throw error;
    }
  }

  async getOne(
    id: string,
  ): Promise<BookVolumeChapterTree | Record<string, never>> {
    logger.info({ message: 'bookService.getOne() Called.' });
    try {
      const user = this.userService.getCurrentUser();
      const book = await this.bookModel
        .findOne({ _id: id, createdBy: user._id })
        .exec(); // 当前用户所作书
      if (book) {
        const res = await this.bookTreeModel.findOne({ _id: id }).exec();
        logger.info({ message: 'bookService.getOne() completed.' });
        return res ? res : {};
      } else {
        throw new ConflictException('id error');
      }
    } catch (error) {
      logger.error({ message: 'bookService.getOne() Error Occured:' });
      logger.error(util.inspect(error, { depth: Infinity }));
      throw error;
    }
  }
}
