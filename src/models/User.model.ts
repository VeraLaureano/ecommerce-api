import { Schema, model } from 'mongoose';
import { User } from '../interfaces/User.interface';

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'PASSWORD_MIN_LENGTH_10']
  }
}, { timestamps: true });

export default model<User>('User', UserSchema);
