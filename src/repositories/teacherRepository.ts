import prisma from '../config/database.js';

import { ITeacher } from '../interfaces/teacherInterface.js';

async function getTeacherById(id: number): Promise<ITeacher> {
  const teacher = await prisma.teacher.findUnique({
    where: {
      id,
    },
  });

  return teacher;
}

async function getTeacherByName(name: string): Promise<ITeacher> {
  const teacher = await prisma.teacher.findUnique({
    where: {
      name,
    },
  });

  return teacher;
}

async function getAllTeachers(): Promise<ITeacher[]> {
  const teacher = await prisma.teacher.findMany();

  return teacher;
}

export default {
  getTeacherById,
  getTeacherByName,
  getAllTeachers,
};
