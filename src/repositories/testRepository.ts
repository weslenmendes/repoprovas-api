import prisma from '../config/database.js';

import { ICreateTest } from '../interfaces/testInterface.js';

async function insertTest(test: ICreateTest) {
  await prisma.test.create({
    data: test,
  });
}

async function getAllTestsByTermAndDiscipline() {
  const tests = await prisma.term.findMany({
    select: {
      id: true,
      number: true,
      disciplines: {
        select: {
          id: true,
          name: true,
          term: {},
          teachersDiscipline: {
            select: {
              id: true,
              discipline: {},
              teacher: {
                select: { id: true, name: true },
              },
              tests: {
                select: { id: true, name: true, pdfUrl: true, category: {} },
              },
            },
          },
        },
      },
    },
  });

  return tests;
}

async function getAllTestsByTeacher() {
  const tests = await prisma.teachersDiscipline.findMany({
    include: {
      discipline: {
        include: {
          term: {},
        },
      },
      teacher: {},
      tests: {
        include: {
          category: {},
        },
      },
    },
  });

  return tests;
}

export default {
  insertTest,
  getAllTestsByTermAndDiscipline,
  getAllTestsByTeacher,
};
