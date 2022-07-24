import { Category } from '@prisma/client';

export type ICreateCategory = Omit<Category, 'id'>;

export type ICategory = Category;
