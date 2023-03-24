import { Model } from 'mongoose';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Exa } from '../interfaces/exa.interface';
// import { ExampleSchema } from '../schemas/example.schema';

@Injectable()
export class ExaService {
  constructor(
    @Inject('EXAMPLE_MODEL')
    private exaModel: Model<Exa>,
  ) {}

  private readonly logger = new Logger(ExaService.name);

  async create(CreateExaDto: Exa): Promise<Exa> {
    console.log(CreateExaDto);
    const createdCat = new this.exaModel(CreateExaDto);
    return createdCat.save();
  }

  async findAll(): Promise<Exa[]> {
    return this.exaModel.find().exec();
  }

  async getHello(): Promise<string> {
    this.logger.log('getData');
    const exaData = JSON.stringify({ name: 'hi', id: '1111' });
    return exaData;
  }
}
