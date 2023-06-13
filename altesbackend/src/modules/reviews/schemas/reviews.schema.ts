import { Schema } from 'mongoose';
import { StateType } from 'src/utils/types';

export const ReviewSchema = new Schema({
  idFile: String,
  fileTitle: String,
  state: {
    type: String,
    default: StateType.NO_CHECKING.toString()
  }
});
