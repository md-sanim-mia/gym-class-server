import prisma from "../../utils/prisma";

const getAllTraineeForDb = async () => {
  const result = prisma.trainee.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });
  return result;
};
const getSingleTraineeForDb = async (id: string) => {
  const result = prisma.trainee.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });
  return result;
};
export const TraineeServices = {
  getAllTraineeForDb,
  getSingleTraineeForDb,
};
