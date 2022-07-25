import { Router } from 'express';

import { addTest, getTests } from '../controllers/testController.js';
import authValidator from '../middlewares/authValidatorMiddleware.js';
import validateSchema from '../middlewares/validateSchemaMiddleware.js';
import { testSchema, testQuerySchema } from '../schemas/testSchema.js';

const testRouter = Router();

testRouter.post('/create', authValidator, validateSchema(testSchema), addTest);
testRouter.get('/view', authValidator, validateSchema(testQuerySchema), getTests);

export default testRouter;
