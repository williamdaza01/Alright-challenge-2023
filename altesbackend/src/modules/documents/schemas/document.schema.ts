import { Schema, SchemaTypes } from 'mongoose';
import { StateType } from 'src/utils/types';

export const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  file: {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  state: {
    type: String,
    default: StateType.NO_CHECKING,
  },
  reviewer: {
    type: String,
    default: "",
  }
});
