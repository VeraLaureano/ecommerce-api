import { ICard } from './../interfaces/Card.interface';
import supabase from '../config/supabase';

export const findAllCards = async () => {
  //const responseSongs = await CardModel.find();
  const { data, error } = await supabase
    .from('cards')
    .select('*');

  if (error) 
    throw error;

  return data;
}

export const findOneCard = async (cardID: string) => {
  //const responseSong = await CardModel.findById({ _id: cardID });
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', cardID)
    .single();

  if (error) 
    throw error;

  return data;
}

export const createCard = async (card: ICard) => {
  //const responseSong = await CardModel.create(data);
  const { data, error } = await supabase
    .from('cards') // Nombre de la tabla
    .insert([
      {
        name: card.name,
        description: card.description,
        price: card.price,
        image_url: card.imageUrl,  // Uso de image_url
        available: card.available,
      }
    ])
    .single();

  if (error) 
    throw error;

  return data;
}

export const findAndUpdateCard = async (cardID: string, card: ICard) => {
  //const responseSong = await CardModel.findOneAndUpdate({ _id: cardID }, data, { new: true });
  const { data, error } = await supabase
    .from('cards')
    .update({
      name: card.name,
      description: card.description,
      price: card.price,
      image_url: card.imageUrl,  // Uso de image_url
      available: card.available,
    })
    .eq('id', cardID)
    .single();

  if (error)
    throw error;

  return data;
}

export const findAndDeleteCard = async (cardID: string) => {
  //const responseSong = await CardModel.findOneAndDelete({ _id: cardID })
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', cardID)
    .single();

  if (error)
    throw error
  
  return data;
}