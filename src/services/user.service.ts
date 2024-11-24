import supabase from '../config/supabase';
import { User } from '../interfaces/User.interface';
//import UserModel from '../models/User.model';

export const createUser = async (user: User): Promise<User> => {
  //const responseUser = await UserModel.create(data);
  const { data, error } = await supabase
    .from('users')
    .insert([{
      username: user.username,
      email: user.email,
      password: user.password
    }])
    .single();

  if (error)
    throw error

  return data;
};

export const findUser = async (email: string) => {
  //const responseUser = await UserModel.findOne({ email: email });
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error)
    throw error

  return data;
};

export const findUserAuth = async (userID: string) => {
  //const responseUser = await UserModel.findById({ _id: userID });
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userID)
    .single();

  if (error)
    throw error

  return data;
};

export const findAndUpdateUser = async (userID: string, user: User) => {
  //const responseUser = await UserModel.findOneAndUpdate({ _id: userID }, data, { new: true });
  const { data, error } = await supabase
    .from('users')
    .update({
      username: user.username
    })
    .eq('id', userID)
    .single();
  
  if (error)
    throw error
  
  return data;
};

export const findAndDeleteUser = async (userID: string) => {
  //const responseUser = await UserModel.findOneAndDelete({ _id: userID });
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userID)
    .single();

  if (error)
    throw error
  
  return data;
};