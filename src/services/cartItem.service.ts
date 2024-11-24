import supabase from "../config/supabase";

export const findAllCartItems = async (cartID: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartID);

  if (error) 
    throw error;

  return data;
}

export const findOneCartItem = async (cartID: string, cardID: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartID)
    .eq('card_id', cardID)
    .single();

  if (error) 
    throw error;

  return data;
}

export const createCartItem = async (cartID: string, cardID: string, quantity: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .insert([
      {
        cart_id: cartID,
        card_id: cardID,
        quantity: quantity,
      }
    ])
    .single();

  if (error) 
    throw error;

  return data;
}

export const updateCartItemQuantity = async (cartID: string, cardID: string, quantity: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({
      quantity: quantity,
    })
    .eq('cart_id', cartID)
    .eq('card_id', cardID)
    .single();

  if (error)
    throw error;

  return data;
}

export const findAndDeleteCartItem = async (cartID: string, cardID: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartID)
    .eq('card_id', cardID);

  if (error)
    throw error;

  return data;
}

export const findAndDeleteAllCartItems = async (cartID: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartID);

  if (error)
    throw error;

  return data;
}

export const getCartSummary = async (cartID: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('card_id, quantity')
    .eq('cart_id', cartID);

  if (error)
    throw error;

  return data;
}
