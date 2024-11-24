import supabase from "../config/supabase";
//import CartModel from "../models/Cart.model"

export const findAllCarts = async () => {
  //const responseCarts = await CartModel.find();
  const { data, error } = await supabase
    .from('carts')
    .select('*');

  if (error)
    throw error

  return data;
}

export const findOneCart = async (userId: string) => {
  //const responseCart = await CartModel.findOne({ userId }).populate('items').exec();
  //const responseCart = await CartModel.findOne({ userId })
  //const responseCart = await CartModel.findOne({ userId }).populate('items.cardId').exec();
  const { data, error } = await supabase
    .from('carts')
    .select('*, cart_items(*)')
    .eq('user_id', userId)
    .single();

  if (error)
    throw error
  
  return data;
}

export const createCart = async (userId: string | number) => {
  //const responseCart = await CartModel.create(data);
  const { data, error } = await supabase
    .from('carts')
    .insert({
      user_id: userId
    })
    .single();

  if (error)
    throw error;

  return data;
}

//export const findAndUpdateCart = async (userId: string, data: ICart) => {
//  const responseCart = await CartModel.findOneAndUpdate({ userId }, data, { new: true });
//  return responseCart;
//}

export const findAndDeleteCart = async (userId: string) => {
  //const responseCart = await CartModel.findOneAndDelete({ userId });
  const { data, error } = await supabase
    .from('carts')
    .delete()
    .eq('user_id', userId)
    .single();

  if (error)
     throw error;

  return data;
}