import mongoose from 'mongoose';
import { validateUsername, validatePhone } from '../utils/validator';

export interface User extends mongoose.Document {
  username: string;
  password: string;
  phone_number: string;
  gender: string;
  avatar: string;
  status: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: [validateUsername, 'invalid username']
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    phone_number: {
      type: String,
      required: true,
      validate: [validatePhone, 'invalid phone number']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'unknow'],
      default: 'unknow'
    },
    avatar: { type: String, default: '' },
    status: { type: String, default: 'normal' }
  },
  { timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' } }
);

export const User = mongoose.model('User', userSchema);
