import { Router } from "express";
import { deleteCartItem, getAllCartItems, patchCartItemQuantity, postCartItem } from "../controllers/cartItem.controller";

const router = Router()

router.route('/:id')
  .get(getAllCartItems) // Checked
  .post(postCartItem) // Checked
  .patch(patchCartItemQuantity) // Checked
  .delete(deleteCartItem) // Checked


export { router as cartItemRouter }