import prisma from '../config/database.js';

import { ICategory } from '../interfaces/categoryInterface.js';

async function getCategoryById(id: number): Promise<ICategory> {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
}

async function getCategoryByName(name: string): Promise<ICategory> {
  const category = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  return category;
}

async function getAllCategories(): Promise<ICategory[]> {
  const categories = await prisma.category.findMany();

  return categories;
}

export default {
  getCategoryById,
  getCategoryByName,
  getAllCategories,
};
