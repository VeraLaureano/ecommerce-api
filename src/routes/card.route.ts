import { Router } from "express";
import { deleteCard, getAllCards, getOneCard, patchCard } from "../controllers/card.controller";
import { createCard } from "../services/card.service";
import { validateCardData, validateCardId } from "../data_validate/card.data";
import { handleValidationErrors } from "../utils/handleValidationErrors";

const router = Router();

router.route('/')
  .get(getAllCards)
  .post(validateCardData, handleValidationErrors, createCard);
router.route('/:id')
  .get(validateCardId, handleValidationErrors, getOneCard)
  .patch(validateCardData, handleValidationErrors, patchCard)
  .delete(validateCardId, handleValidationErrors, deleteCard)

export { router as cardRouter }