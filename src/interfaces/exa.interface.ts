import { Document } from 'mongoose';

export interface Exa extends Document {
  readonly name: string;
  readonly id: string;
}
