import testRepository from '../repositories/testRepository.js';
import disciplineRepository from '../repositories/disciplineRepository.js';
import teacherRepository from '../repositories/teacherRepository.js';
import teacherDisciplineRepository from '../repositories/teacherDisciplineRepository.js';
import categoryRepository from '../repositories/categoryRepository.js';
import userRepository from '../repositories/userRepository.js';

import emailService from './emailService.js';

import testFactory from './factories/testFactory.js';
import { ICreateTestExtended } from '../interfaces/testInterface.js';
import { generateError } from '../errors/errorGenerator.js';

type TRepositoryNames = 'teacher' | 'discipline' | 'category';

async function checkIfExists(value: string | number, repositoryName: TRepositoryNames) {
  const isValueId = Number.isNaN(Number(value)) ? { id: false, name: true } : { id: true, name: false };

  if (repositoryName === 'teacher') {
    return isValueId.id ? teacherRepository.getTeacherById(+value) : teacherRepository.getTeacherByName(String(value));
  }

  if (repositoryName === 'discipline') {
    return isValueId.id
      ? disciplineRepository.getDisciplineById(+value)
      : disciplineRepository.getDisciplineByName(String(value));
  }

  if (repositoryName === 'category') {
    return isValueId.id
      ? categoryRepository.getCategoryById(+value)
      : categoryRepository.getCategoryByName(String(value));
  }

  return null;
}

async function sendAEmailToAllUsers(nameOfTest: string) {
  const allUsers = await userRepository.getAllUsers();

  const allUsersEmails = allUsers.map((user) => user.email);

  const promises = allUsersEmails.map((email) => emailService.sendEmail(email, nameOfTest));

  await Promise.all(promises);
}

async function createTest(test: ICreateTestExtended): Promise<any> {
  const { teacher, discipline } = test;

  const teacherFinded = await checkIfExists(teacher, 'teacher');

  if (!teacherFinded) {
    throw generateError({ type: 'NotFoundError', message: 'Teacher not found.' });
  }

  const disciplineFinded = await checkIfExists(discipline, 'discipline');

  if (!disciplineFinded) {
    throw generateError({ type: 'NotFoundError', message: 'Discipline not found.' });
  }

  const isTeacherTeachesDiscipline = await teacherDisciplineRepository.getByTeacherIdAndDisciplineId(
    teacherFinded.id,
    disciplineFinded.id
  );

  if (!isTeacherTeachesDiscipline) {
    throw generateError({ type: 'NotFoundError', message: 'Teacher does not teach this discipline.' });
  }

  const categoryFinded = await checkIfExists(test.category, 'category');

  if (!categoryFinded) {
    throw generateError({ type: 'NotFoundError', message: 'Category not found.' });
  }

  const teacherDisciplineId = isTeacherTeachesDiscipline.id;

  const newTest = testFactory.createANewTest(test, categoryFinded.id, teacherDisciplineId);

  await testRepository.insertTest(newTest);

  const nameOfTest = `${teacherFinded.name} ${categoryFinded.name} ${new Date().getFullYear()} - ${test.name} (${
    disciplineFinded.name
  })`;

  sendAEmailToAllUsers(nameOfTest);
}

async function getAllTestsByOrderBy(orderBy: string) {
  let tests = null;

  if (orderBy === 'discipline') {
    tests = await testRepository.getAllTestsByTermAndDiscipline();
  }

  if (orderBy === 'teacher') {
    tests = await testRepository.getAllTestsByTeacher();
  }

  return tests;
}

export default {
  createTest,
  getAllTestsByOrderBy,
};
