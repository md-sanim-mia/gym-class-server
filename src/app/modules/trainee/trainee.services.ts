import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { Role } from "../../../../generated/prisma";
import { createToken } from "../../utils/crateToken";
import confing from "../../confing";
const createTraineeForDb = async (paylood: any) => {
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
    return createdUser;
  });

  const jwtPayload = {
    userId: result.id,
    email: result.email,
    role: result.role,
  };
  const accessToken = createToken(
    jwtPayload,
    confing.jwt_secret as string,
    confing.expires_in as string
  );
  return { accessToken: accessToken };
};
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
  createTraineeForDb,
};
