import testRepository from '../repositories/testRepository.js';
import disciplineRepository from '../repositories/disciplineRepository.js';
import teacherRepository from '../repositories/teacherRepository.js';
import teacherDisciplineRepository from '../repositories/teacherDisciplineRepository.js';
import categoryRepository from '../repositories/categoryRepository.js';

import testFactory from './factories/testFactory.js';
import { ICreateTestExtended } from '../interfaces/testInterface.js';
import { generateError } from '../errors/errorGenerator.js';

type TRepositoryNames = 'teacher' | 'discipline' | 'category';

async function checkIfExists(value: string | number, repositoryName: TRepositoryNames) {
  const isValueId = Number.isNaN(Number(value)) ? { id: false, name: true } : { id: true, name: false };

  if (repositoryName === 'teacher') {
    return isValueId.id
      ? (await teacherRepository.getTeacherById(+value))?.id
      : (await teacherRepository.getTeacherByName(String(value)))?.id;
  }

  if (repositoryName === 'discipline') {
    return isValueId.id
      ? (await disciplineRepository.getDisciplineById(+value))?.id
      : (await disciplineRepository.getDisciplineByName(String(value)))?.id;
  }

  if (repositoryName === 'category') {
    return isValueId.id
      ? (await categoryRepository.getCategoryById(+value))?.id
      : (await categoryRepository.getCategoryByName(String(value)))?.id;
  }

  return null;
}

async function createTest(test: ICreateTestExtended): Promise<any> {
  const { teacher, discipline } = test;

  const teacherId = await checkIfExists(teacher, 'teacher');

  if (!teacherId) {
    throw generateError({ type: 'NotFoundError', message: 'Teacher not found.' });
  }

  const disciplineId = await checkIfExists(discipline, 'discipline');

  if (!disciplineId) {
    throw generateError({ type: 'NotFoundError', message: 'Discipline not found.' });
  }

  const isTeacherTeachesDiscipline = await teacherDisciplineRepository.getByTeacherIdAndDisciplineId(
    teacherId,
    disciplineId
  );

  if (!isTeacherTeachesDiscipline) {
    throw generateError({ type: 'NotFoundError', message: 'Teacher does not teach this discipline.' });
  }

  const categoryId = await checkIfExists(test.category, 'category');

  if (!categoryId) {
    throw generateError({ type: 'NotFoundError', message: 'Category not found.' });
  }

  const teacherDisciplineId = isTeacherTeachesDiscipline.id;

  const newTest = testFactory.createANewTest(test, categoryId, teacherDisciplineId);

  await testRepository.insertTest(newTest);
}

export default {
  createTest,
};
