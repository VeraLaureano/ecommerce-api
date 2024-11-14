import { User } from '../interfaces/User.interface';
import UserModel from '../models/User.model';

export const createUser = async (data: User) => {
  const responseUser = await UserModel.create(data);
  return responseUser;
};

export const findUser = async (email: string) => {
  const responseUser = await UserModel.findOne({ email: email });
  return responseUser;
};

export const findUserAuth = async (userID: string) => {
  const responseUser = await UserModel.findById({ _id: userID });
  return responseUser;
};

export const findAndUpdateUser = async (userID: string, data: object) => {
  const responseUser = await UserModel.findOneAndUpdate({ _id: userID }, data, { new: true });
  return responseUser;
};

export const findAndDeleteUser = async (userID: string) => {
  const responseUser = await UserModel.findOneAndDelete({ _id: userID });
  return responseUser;
};