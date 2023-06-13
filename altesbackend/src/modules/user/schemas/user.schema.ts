import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    isReviewer:{
      type: Boolean,
      default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});