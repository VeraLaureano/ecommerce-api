import { Router } from "express";
import { getCart } from "../controllers/cart.controller";
const router = Router()

router.route('/')
  .get(getCart) // Checked
//router.route('/:id')
//  .patch(updateOrAddCardToCart);
//router.route('/:id/remove')
//  .patch(removeCardFromCart)

export { router as cartRouter }