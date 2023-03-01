import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Exa } from '../interfaces/exa.interface';
// import { ExampleSchema } from '../schemas/example.schema';

@Injectable()
export class ExaService {
  constructor(
    @Inject('EXAMPLE_MODEL')
    private exaModel: Model<Exa>,
  ) {}

  async create(CreateExaDto: Exa): Promise<Exa> {
    console.log(CreateExaDto);
    const createdCat = new this.exaModel(CreateExaDto);
    return createdCat.save();
  }

  async findAll(): Promise<Exa[]> {
    return this.exaModel.find().exec();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
