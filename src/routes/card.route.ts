import { Router } from "express";
import { deleteCard, getAllCards, getOneCard, patchCard, postCard } from "../controllers/card.controller";
import { validateCardData, validateCardId } from "../data_validate/card.data";
import { handleValidationErrors } from "../utils/handleValidationErrors";

const router = Router();

router.route('/')
  .get(getAllCards)
  .post(validateCardData, handleValidationErrors, postCard);
router.route('/:id')
  .get(validateCardId, handleValidationErrors, getOneCard)
  .patch(validateCardData, handleValidationErrors, patchCard)
  .delete(validateCardId, handleValidationErrors, deleteCard)

export { router as cardRouter }