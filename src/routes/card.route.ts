import { Router } from "express";
import { deleteCard, getAllCards, getOneCard, patchCard, postCard } from "../controllers/card.controller";
import { validateCardData } from "../data_validate/card.data";
import { handleValidationErrors } from "../utils/handleValidationErrors";

const router = Router();

router.route('/')
  .get(getAllCards) // Checked 
  .post(validateCardData, handleValidationErrors, postCard); // Checked 
router.route('/:id')
  .get(getOneCard) // Checked 
  .patch(patchCard) // Checked 
  .delete(deleteCard); // Checked

export { router as cardRouter }