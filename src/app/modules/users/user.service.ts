import { PrismaClient } from "../../../../generated/prisma";
const prisma = new PrismaClient();

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
  getAllUsersForDb,
  getSingleUsersForDb,
};
