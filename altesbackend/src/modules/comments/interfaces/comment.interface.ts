import { Document } from 'mongoose';
import { StateType } from 'src/utils/types';

export interface Comment extends Document {
  idOwner: string;
  idFile: string;
  nameOwner: string;
  description: string;
  state?: StateType;
}
