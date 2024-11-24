import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces/AuthRequest.interface";
import { findOneCart } from "../services/cart.service";
import { logError } from "../utils/loggers";
import { EVERYTHING_OK, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../config/statusCode";
//import mongoose from "mongoose";
//import { findOneCard } from "../services/card.service";
//import { cleanXSS } from "../utils/sanitize";
//import { ICart } from "../interfaces/Cart.interface";

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Paso 1: Validar que el usuario esté autenticado a través del JWT
    const userId = req.user?.id; // Esto se obtiene de un middleware de autenticación, asumiendo que el JWT está validado
    
    if (!userId)
      return res.status(UNAUTHORIZED).json({ message: 'User unauthorized' })

    const cart = await findOneCart(userId);

    // Paso 3: Si no se encuentra el carrito, devolver un error adecuado
    if (!cart) {
      return res.status(NOT_FOUND).json({
        message: 'Cart not found',
      });
    }

    // Paso 4: Devolver el carrito en la respuesta
    return res.status(EVERYTHING_OK).json(cart);
  } catch (error) {
    logError(error);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
/*
export const updateOrAddCardToCart  = async (req: AuthenticatedRequest, res: Response) => {
  const { cardId, quantity } = req.body;  // Suponemos que el cliente pasa el `cardId` y la nueva `quantity`

  try {
    const sanitizedCardId: string = cleanXSS(cardId)

    // Paso 1: Verificar si el producto existe
    const card = await findOneCard(sanitizedCardId);

    if (!card) {
      return res.status(404).json({ message: 'Card not found.' });
    }

    // Paso 2: Buscar el carrito del usuario autenticado
    const userId = req.user?.id;  // El ID del usuario debe estar en el token JWT
    
    if (!userId)
      return res.status(UNAUTHORIZED).json({ message: 'User unauthorized' })

    const cart: ICart = await findOneCart(userId);

    // Si el carrito no existe, devolver un error
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    // Paso 3: Verificar si el producto ya existe en el carrito
    const existingItemIndex: number = cart.items.findIndex(item => item.cardId.toString() === cardId);

    if (existingItemIndex > -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      cart.items[existingItemIndex].quantity = quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad especificada
      cart.items.push({ cardId, quantity });
    }

    // Paso 4: Guardar el carrito actualizado
    //const updatedCart = await findAndUpdateCart(userId, cart);

    // Returning a response with status 200 (Everything OK) and the updated card data
    return res.status(EVERYTHING_OK).json({ message: 'Cart updated successfully' });
    //return res.status(EVERYTHING_OK).json({ message: 'Cart updated successfully', card: updatedCart });
  } catch (error) {
    // Catching any errors, logging them, and returning a 500 response (Internal Server Error)
    logError(error);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

// Controlador para eliminar un producto del carrito
export const removeCardFromCart = async (req: AuthenticatedRequest, res: Response) => {
  const { cardId } = req.body;  // ID del producto a eliminar

  try {
    // Validación de datos
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ message: 'ID de producto inválido.' });
    }

    // Buscar el producto para verificar si existe
    const sanitizedCardId: string = cleanXSS(cardId);
    const card = await findOneCard(sanitizedCardId)
    if (!card) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    // Buscar el carrito del usuario
    const userId = req.user?.id;  // Obtener el ID del usuario del token

    if (!userId)
      return res.status(UNAUTHORIZED).json({ message: 'User unauthorized' })

    const sanitizedUserId: string = cleanXSS(userId);
    const cart: ICart = await findOneCart(sanitizedUserId);

    // Si el carrito no existe
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    // Buscar el producto en el carrito
    const existingItemIndex = cart.items.findIndex(item => item.cardId.toString() === cardId);

    if (existingItemIndex === -1) {
      return res.status(404).json({ message: 'Card not found in cart.' });
    }

    // Eliminar el producto del carrito
    cart.items.splice(existingItemIndex, 1);

    // Guardar el carrito actualizado
    //await cart.save();

    return res.status(200).json({
      message: 'Card deleted successfully.',
      cart,
    });
  } catch (error) {
    // Catching any errors, logging them, and returning a 500 response (Internal Server Error)
    logError(error);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
*/