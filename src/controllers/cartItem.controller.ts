import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/AuthRequest.interface";
import { asyncWrapper } from "../utils/asyncWrapper";
import { EVERYTHING_OK, NOT_FOUND, BAD_REQUEST, CREATED } from "../config/statusCode";
import { createCartItem, findAllCartItems, findAndDeleteCartItem, findOneCartItem, updateCartItemQuantity } from "../services/cartItem.service"; // Asumiendo que el servicio se llama cartItem.service
import { cleanXSS } from "../utils/sanitize";
import { findOneCart } from "../services/cart.service";
import { CartItem } from "../interfaces/CartItem.interface";

// Controlador para obtener todos los items de un carrito
export const getAllCartItems = asyncWrapper(async ({ params: { id } }: AuthenticatedRequest, res: Response) => {
  const sanitizedId: string = cleanXSS(id)
  const cart = await findOneCart(sanitizedId)

  if (!cart)
    return res.status(NOT_FOUND).json('Not found cart with this id')
 
  const cartItems = await findAllCartItems(cart.id);
  
  if (!cartItems)
    return res.status(NOT_FOUND).json('Not found cart with this id')

  return res.status(EVERYTHING_OK).json({ user_id: sanitizedId, cartItems });
});

//export const getOneCartItem = asyncWrapper(async ({ params: { cartId, cardId } }: AuthenticatedRequest, res: Response) => {
//  const cartItem = await findOneCartItem(cartId, cardId);
//  
//  if (!cartItem) {
//    return res.status(NOT_FOUND).json({ message: 'Item not found in cart' });
//  }
//
//  return res.status(EVERYTHING_OK).json(cartItem);
//});

export const postCartItem = asyncWrapper(async ({ params: { id }, body }: AuthenticatedRequest, res: Response) => {
  const { cardId, quantity } = body;
  
  if (!cardId || !quantity) 
    return res.status(BAD_REQUEST).json({ message: 'Card ID and quantity are required' });
  
  const numericQuantity: number = Number(quantity)

  if (isNaN(numericQuantity) && typeof numericQuantity !== 'number')
    return res.status(BAD_REQUEST).json({ message: 'Quantity should be a number' });

  if (!(0 < numericQuantity && numericQuantity < 100))
    return res.status(BAD_REQUEST).json({ message: 'Quantity is out range' });
  
  const sanitizedId: string = cleanXSS(id)
  const cart = await findOneCart(sanitizedId)
  const sanitizedCardId: string = cleanXSS(cardId);

  if (!cart)
    return res.status(NOT_FOUND).json('Not found cart with this id')
 
  // Creando el nuevo item en el carrito
  await createCartItem(cart.id, sanitizedCardId, quantity);

  return res.status(CREATED).json({ message: 'Item added to cart successfully' });
});

export const patchCartItemQuantity = asyncWrapper(async ({ params: { id }, body }: AuthenticatedRequest, res: Response) => {
  const { cardId, quantity } = body;

  if (!cardId || !quantity) 
    return res.status(BAD_REQUEST).json({ message: 'Card ID and quantity are required' });
  
  const numericQuantity = Number(quantity)
  
  if (isNaN(numericQuantity) && typeof numericQuantity !== 'number')
    return res.status(BAD_REQUEST).json({ message: 'Quantity should be a number' });

  if (!(0 < numericQuantity && numericQuantity < 100))
    return res.status(BAD_REQUEST).json({ message: 'Quantity is out range' });
  
  const sanitizedId: string = cleanXSS(id)
  const cart = await findOneCart(sanitizedId)
  const sanitizedCardId: string = cleanXSS(cardId);

  // Actualizando la cantidad del item
  await updateCartItemQuantity(cart.id, sanitizedCardId, quantity);
  
  const updatedCartItem: CartItem = await findOneCartItem(cart.id, sanitizedCardId);

  if (!updatedCartItem) 
    return res.status(NOT_FOUND).json({ message: 'Item not found in cart' });

  return res.status(EVERYTHING_OK).json({ message: 'Item quantity updated successfully', cartItem: updatedCartItem });
});

export const deleteCartItem = asyncWrapper(async ({ params: { id }, body }: AuthenticatedRequest, res: Response) => {
  const { cardId } = body;

  const sanitizedId: string = cleanXSS(id)
  const cart = await findOneCart(sanitizedId)
  const sanitizedCardId: string = cleanXSS(cardId);

  await findAndDeleteCartItem(cart.id, sanitizedCardId);

  return res.status(EVERYTHING_OK).json({ message: 'Item removed from cart successfully' });
});

//export const deleteAllCartItems = asyncWrapper(async ({ params: { id } }: AuthenticatedRequest, res: Response) => {
//  await findAndDeleteAllCartItems(cartId);
//
//  return res.status(EVERYTHING_OK).json({ message: 'All items removed from cart successfully' });
//});