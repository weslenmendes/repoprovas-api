import { Request, Response } from 'express';

import userService from '../services/userService.js';
import { ICreateUser, IUser } from '../interfaces/userInterface.js';

export async function signUp(req: Request, res: Response) {
  const user: ICreateUser = req.body;

  await userService.createUser(user);

  res.status(201).send({ message: 'User created.' });
}

export async function signIn(req: Request, res: Response) {
  const user: IUser = req.body;

  const token = await userService.signIn(user);

  res.send(token);
}
