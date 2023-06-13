import { Document } from 'mongoose';
import { StateType } from 'src/utils/types';

export interface DocumentPdf extends Document {
  title: string;
  file: {
    data: Buffer;
    contentType: string;
    filename: string;
  };
  state?: StateType;
  reviewer?: string;
}
