import prisma from '../config/database.js';

import { ICreateUser, IUser } from '../interfaces/userInterface.js';
import { encrypt } from '../utils/encryptUtils.js';

async function insertUser(user: ICreateUser) {
  const newUser = { email: user.email, password: encrypt(user.password) };

  await prisma.user.create({
    data: newUser,
  });
}

async function getUserById(id: number): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

async function getUserByEmail(email: string): Promise<IUser> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  return users;
}

export default {
  insertUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
};
