import { Document } from 'mongoose'

export interface User extends Document {
    name?: string;
    lastname?: string;
    email: string;
    password: string;
    isReviewer?: boolean;
    createdAt?: Date;
}