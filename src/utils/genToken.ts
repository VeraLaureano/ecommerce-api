import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env';

export const genToken =  (key: string) => {
  const token = sign({ userID: key }, String(SECRET_KEY), { expiresIn: '1h' });
  return token;
};