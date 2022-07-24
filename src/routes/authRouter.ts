import { Router } from 'express';

import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import { signUp, signIn } from '../controllers/authController.js';
import { signUpSchema, signInSchema } from '../schemas/authSchema.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), signIn);

export default authRouter;
