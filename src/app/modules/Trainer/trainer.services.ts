import bcrypt from "bcrypt";
import { Role } from "../../../../generated/prisma";
import prisma from "../../utils/prisma";

const createTrainerForDb = async (paylood: any) => {
  console.log(paylood);
  if (!paylood.password) {
    throw new Error("password is not found");
  }

  const hasPassword = await bcrypt.hash(paylood.password, 10);
  if (!hasPassword) {
    throw new Error("bcrypt solt generated problem");
  }
  const isTrainerExist = await prisma.user.findUnique({
    where: {
      email: paylood.email,
    },
  });
  console.log(isTrainerExist);

  if (isTrainerExist) {
    throw new Error("Trainer already exist in databes");
  }
  const TrainerData = {
    email: paylood.email,
    password: hasPassword,
    role: Role.TRAINER,
  };
  const trainerData = {
    name: paylood.name,
    expertise:paylood.expertise
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdTrainer = await transactionClient.user.create({
      data: TrainerData,
    });

    const createdTrainee = await transactionClient.trainer.create({
      data: {
        ...trainerData,
        user: {
          connect: {
            id: createdTrainer.id,
          },
        },
      },
    });
    return createdTrainee;
  });

  return result;
};

const getAllTrainersForDb = async () => {
  const result = prisma.trainer.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      expertise: true,
    },
  });
  return result;
};
const getSingleTrainersForDb = async (id: string) => {
  const result = prisma.trainer.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      expertise: true,
    },
  });

  return result;
};
export const TrainerServices = {
  createTrainerForDb,
  getAllTrainersForDb,
  getSingleTrainersForDb,
};
