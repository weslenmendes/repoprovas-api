import prisma from '../config/database.js';

import { IDiscipline } from '../interfaces/disciplineInterface.js';

async function getDisciplineById(id: number): Promise<IDiscipline> {
  const discipline = await prisma.discipline.findUnique({
    where: {
      id,
    },
  });

  return discipline;
}

async function getDisciplineByName(name: string): Promise<IDiscipline> {
  const discipline = await prisma.discipline.findUnique({
    where: {
      name,
    },
  });

  return discipline;
}

async function getAllDiscipline(): Promise<IDiscipline[]> {
  const disciplines = await prisma.discipline.findMany();

  return disciplines;
}

export default {
  getDisciplineById,
  getDisciplineByName,
  getAllDiscipline,
};
