import { Schema, model } from 'mongoose';
import { User } from '../interfaces/User.interface';

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, 'MUST_PROVIDE_USERNAME'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'MUST_PROVIDE_EMAIL'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'MUST_PROVIDE_PASSWORD'],
    minlength: [10, 'PASSWORD_MIN_LENGTH_10']
  }
}, { timestamps: true });

const UserModel = model('User', UserSchema);
export default UserModel;