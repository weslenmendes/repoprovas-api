import prisma from '../config/database.js';

const getByTeacherIdAndDisciplineId = async (teacherId: number, disciplineId: number) => {
  const teacherDiscipline = prisma.teachersDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });

  return teacherDiscipline;
};

export default {
  getByTeacherIdAndDisciplineId,
};
