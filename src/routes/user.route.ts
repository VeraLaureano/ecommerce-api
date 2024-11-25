import { Router } from 'express';
import { postUserLogin, postUserSignup } from '../controllers/user.controller';
import { loginLimiter, signupLimiter } from './../utils/limiter';

const router = Router();

router.route('/signup')
  .post(signupLimiter, postUserSignup); // Checked
router.route('/login')
  .post(loginLimiter, postUserLogin); // Checked

export { router as userRouter };