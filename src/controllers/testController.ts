import { Request, Response } from 'express';

import testService from '../services/testService.js';
import { ICreateTestExtended } from '../interfaces/testInterface.js';

export async function addTest(req: Request, res: Response) {
  const test: ICreateTestExtended = req.body;

  await testService.createTest(test);

  res.status(201).send({ message: 'Test created.' });
}

export async function getTests(req: Request, res: Response) {
  const { orderBy } = req.query;

  const tests = await testService.getAllTestsByOrderBy(orderBy as string);

  res.send(tests);
}
