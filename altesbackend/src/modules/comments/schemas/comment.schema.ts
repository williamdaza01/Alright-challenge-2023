import { Schema } from 'mongoose';
import { StateType } from 'src/utils/types';

export const CommentSchema = new Schema({
  idOwner: String,
  idFile: String,
  nameOwner: String,
  description: String,
  state: {
    type: String,
    default: StateType.NO_CHECKING.toString(),
  },
});
