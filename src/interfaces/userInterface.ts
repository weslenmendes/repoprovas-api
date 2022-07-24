import { User } from '@prisma/client';

export type ICreateUser = Omit<User, 'id'>;

export type IUser = User;
