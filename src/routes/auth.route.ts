import { Router } from 'express';
import { deleteUser, getUser, patchUser } from '../controllers/user.controller';

const router = Router();

router.route('/')
  .get(getUser)
  .patch(patchUser)
  .delete(deleteUser);

export { router as authRouter };