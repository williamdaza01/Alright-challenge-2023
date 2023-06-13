import { Document } from 'mongoose';
import { StateType } from 'src/utils/types';

export interface Review extends Document {
  idFile: string;
  fileTitle: string;
  state?: StateType;
}
