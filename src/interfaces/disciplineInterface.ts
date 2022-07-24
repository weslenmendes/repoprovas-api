import { Discipline } from '@prisma/client';

export type ICreateDiscipline = Omit<Discipline, 'id'>;

export type IDiscipline = Discipline;
