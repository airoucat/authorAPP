import * as mongoose from 'mongoose';

export const ExampleSchema = new mongoose.Schema({
  name: String,
  id: String,
});
