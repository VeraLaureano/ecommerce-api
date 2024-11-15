import { ICart } from "../interfaces/Cart.interface";
import CartModel from "../models/Cart.model"

export const findAllCarts = async () => {
  const responseCarts = await CartModel.find();
  return responseCarts;
}

export const findOneCart = async (userId: string) => {
  //const responseCart = await CartModel.findOne({ userId }).populate('items').exec();
  const responseCart = await CartModel.findOne({ userId })
  //const responseCart = await CartModel.findOne({ userId }).populate('items.cardId').exec();
  return responseCart;
}

export const createCart = async (data:ICart) => {
  const responseCart = await CartModel.create(data);
  return responseCart;
}

export const findAndUpdateCart = async (userId: string, data: ICart) => {
  const responseCart = await CartModel.findOneAndUpdate({ userId }, data, { new: true });
  return responseCart;
}

export const findAndDeleteCart = async (userId: string) => {
  const responseCart = await CartModel.findOneAndDelete({ userId });
  return responseCart;
}