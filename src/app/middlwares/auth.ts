import jwt, { JwtPayload } from "jsonwebtoken";
import asyncCatch from "../utils/async.catch";
import confing from "../confing";
import prisma from "../utils/prisma";
const auth = (...requireRole: string[]) => {
  return asyncCatch(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("you are not authorization");
    }

    const decoded = jwt.verify(token, confing.jwt_secret as string);
    const { userId, email, role } = decoded as JwtPayload;
    const isExist = await prisma.user.findFirst({ where: { id: userId } });

    if (!isExist) {
      throw new Error("you are not authorization");
    }
    if (requireRole && !requireRole.includes(role)) {
      throw new Error("you are not authorization");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
