import { ICard } from './../interfaces/Card.interface';
import CardModel from '../models/Card.model';
import supabase from '../config/supabase';

export const findAllCards = async () => {
  //const responseSongs = await CardModel.find();
  const { data, error } = await supabase
    .from('cards')
    .select('*');

  if (error) {
    console.error("Error al obtener cartas:", error);
    throw error;
  } 

  return data;
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