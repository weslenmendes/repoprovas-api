import { Teacher } from '@prisma/client';

export type ICreateTeacher = Omit<Teacher, 'id'>;

export type ITeacher = Teacher;
