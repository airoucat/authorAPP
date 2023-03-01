import { Connection } from 'mongoose';
import { ExampleSchema } from '../schemas/example.schema';

export const ExampleProviders = [
  {
    provide: 'EXAMPLE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Exa', ExampleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
