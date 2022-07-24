import { ICreateTestExtended } from '../../interfaces/testInterface.js';

const createANewTest = (test: ICreateTestExtended, categoryId: number, teacherDisciplineId: number) => ({
  name: test.name,
  pdfUrl: test.pdfUrl,
  categoryId,
  teacherDisciplineId,
});

export default {
  createANewTest,
};
