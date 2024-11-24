import { Router } from "express";
import { deleteCartItem, getAllCartItems, patchCartItemQuantity, postCartItem } from "../controllers/cartItem.controller";

const router = Router()

router.route('/:id')
  .get(getAllCartItems)
  .post(postCartItem)
  .patch(patchCartItemQuantity)
  .delete(deleteCartItem)


export { router as cartItemRouter }