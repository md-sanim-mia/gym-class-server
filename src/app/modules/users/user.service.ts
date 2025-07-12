import bcrypt from "bcrypt";
import { PrismaClient, Role } from "../../../../generated/prisma";
const prisma = new PrismaClient();

const createUserForDb = async (paylood: any) => {
  console.log(paylood);
  if (!paylood.password) {
    throw new Error("password is not found");
  }

  const hasPassword = await bcrypt.hash(paylood.password, 10);
  if (!hasPassword) {
    throw new Error("bcrypt solt generated problem");
  }
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: paylood.email,
    },
  });
  console.log(isUserExist);

  if (isUserExist) {
    throw new Error("user already exist in databes");
  }
  const userData = {
    email: paylood.email,
    password: hasPassword,
    role: Role.TRAINEE,
  };
  const traineeData = {
    name: paylood.name,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });

    const createdTrainee = await transactionClient.trainee.create({
      data: {
        ...traineeData,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });
    return createdTrainee;
  });

  return result;
};

const getAllUsersForDb = async () => {
  const result = prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
const getSingleUsersForDb = async (id: string) => {
  const result = prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
export const userServices = {
  createUserForDb,
  getAllUsersForDb,
  getSingleUsersForDb,
};
