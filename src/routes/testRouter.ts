import { Router } from 'express';

import { addTest } from '../controllers/testController.js';
import authValidator from '../middlewares/authValidatorMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import testSchema from '../schemas/testSchema.js';

const testRouter = Router();

testRouter.post('/create', authValidator, validateSchema(testSchema), addTest);

export default testRouter;
