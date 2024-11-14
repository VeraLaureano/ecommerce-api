import { ICard } from './../interfaces/Card.interface';
import CardModel from '../models/Card.model';

export const findAllCards = async () => {
  const responseSongs = await CardModel.find();
  return responseSongs;
}

export const findOneCard = async (cardID: string) => {
  const responseSong = await CardModel.findById({ _id: cardID });
  return responseSong;{}
}

export const createCard = async (data: ICard) => {
  const responseSong = await CardModel.create(data);
  return responseSong;
}

export const findAndUpdateCard = async (cardID: string, data: ICard) => {
  const responseSong = await CardModel.findOneAndUpdate({ _id: cardID }, data, { new: true });
  return responseSong;
}

export const findAndDeleteCard = async (cardID: string) => {
  const responseSong = await CardModel.findOneAndDelete({ _id: cardID })
  return responseSong;
}