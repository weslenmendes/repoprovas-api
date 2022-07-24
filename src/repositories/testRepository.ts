import prisma from '../config/database.js';

import { ICreateTest } from '../interfaces/testInterface.js';

async function insertTest(test: ICreateTest) {
  await prisma.test.create({
    data: test,
  });
}

// async function getAllTests(): Promise<ITest[]> {
//   const tests = await prisma.test.findMany();
//   return tests;
// }

export default {
  insertTest,
};
