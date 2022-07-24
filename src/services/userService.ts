import userRepository from '../repositories/userRepository.js';

import { ICreateUser, IUser } from '../interfaces/userInterface.js';
import { generateError } from '../errors/errorGenerator.js';
import { generateToken } from '../utils/jwtUtils.js';
import { decryptAndCompare } from '../utils/encryptUtils.js';

async function userExists(email: string) {
  const user = await userRepository.getUserByEmail(email);
  return user;
}

async function createUser(user: ICreateUser) {
  const userAlreadyExists = await userExists(user.email);

  if (userAlreadyExists) {
    throw generateError({
      type: 'BadRequestError',
      message: 'This user already exists.',
    });
  }

  await userRepository.insertUser(user);
}

async function signIn(user: IUser) {
  const userFound = await userExists(user.email);

  if (!userFound) {
    throw generateError({
      type: 'NotFoundError',
      message: 'This user does not exist.',
    });
  }

  const isTheSamePassword = decryptAndCompare(user.password, userFound.password);

  if (!isTheSamePassword) {
    throw generateError({
      type: 'UnprocessableEntityError',
      message: 'Incorrect password.',
    });
  }

  const token = generateToken({ userId: userFound.id });

  return { token };
}

export default {
  createUser,
  signIn,
};
