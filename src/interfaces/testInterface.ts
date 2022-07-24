import { Test } from '@prisma/client';

export type ICreateTest = Omit<Test, 'id' | 'createdAt' | 'updatedAt'>;

export interface ICreateTestExtended extends ICreateTest {
  categoryId: number;
  disciplineId: number;
  teacherId: number;
  teacher?: string;
  category?: string;
  discipline?: string;
}

export type ITest = Test;
