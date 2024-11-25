import { Router } from 'express';
import { deleteUser, getUser, patchUser } from '../controllers/user.controller';

const router = Router();

router.route('/')
  .get(getUser) // Checked
  .patch(patchUser) // Checked
  .delete(deleteUser);

export { router as authRouter };