import { Request, Response } from 'express';

import testService from '../services/testService.js';
import { ICreateTestExtended } from '../interfaces/testInterface.js';

export async function addTest(req: Request, res: Response) {
  const test: ICreateTestExtended = req.body;

  await testService.createTest(test);

  res.status(201).send({ message: 'Test created.' });
}

export async function getTestsByDiscipline(_req: Request, res: Response) {
  const tests = await testService.getAllTestsByDiscipline();

  res.send(tests);
}

export async function getTermsByTeacher(_req: Request, res: Response) {
  const tests = await testService.getAllTestsByTeacher();

  res.send(tests);
}
