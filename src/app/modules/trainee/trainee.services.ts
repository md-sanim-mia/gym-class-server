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
const updateSingleTraineeForDb = async (id: string, payload: any) => {
  const trainee = await prisma.trainee.findFirst({ where: { userId: id } });
  if (!trainee) {
    throw new Error("Trainee is not found!");
  }
  const result = await prisma.trainee.update({
    where: { id: trainee?.id },
    data: payload,
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
  updateSingleTraineeForDb,
};
