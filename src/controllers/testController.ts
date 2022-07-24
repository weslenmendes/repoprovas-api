import { Request, Response } from 'express';

import testService from '../services/testService.js';
import { ICreateTestExtended } from '../interfaces/testInterface.js';

export async function addTest(req: Request, res: Response) {
  const test: ICreateTestExtended = req.body;

  await testService.createTest(test);

  res.status(201).send({ message: 'Test created.' });
}

export async function getTestsByDiscipline(req: Request, res: Response) {}

export async function getTermsByTeacher(req: Request, res: Response) {}
