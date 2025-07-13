import { User } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import ApiError from "../../Error/app.error";
import prisma from "../../utils/prisma";
import { createToken } from "../../utils/crateToken";
import confing from "../../confing";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
const logingUserForDb = async (payload: Partial<User>) => {
  if (!payload.email || !payload.password) {
    throw new ApiError(
      httpStatus.NON_AUTHORITATIVE_INFORMATION,
      "Missing required fields"
    );
  }
  const isExistUser = await prisma.user.findFirst({
    where: { email: payload.email },
  });

  if (!isExistUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invilide email or password please try agin"
    );
  }

  const checkPassword = await bcrypt.compare(
    payload.password,
    isExistUser?.password
  );

  if (!checkPassword) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Invilide email or password please try agin"
    );
  }
  const jwtPayload = {
    userId: isExistUser.id,
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    confing.jwt_secret as string,
    confing.expires_in as string
  );
  const refeshToken = createToken(
    jwtPayload,
    confing.refresh_secret as string,
    confing.refresh_expires_in as string
  );

  const result = {
    accessToken,
    refeshToken,
  };
  return result;
};
const refeshTokenInToForDb = async (paylood: string) => {
  const decode = jwt.verify(paylood, confing.refresh_secret as string);

  const { email, role } = decode as JwtPayload;
  if (!decode) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "you ar not authorized");
  }
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "you ar not authorized");
  }
  const jwtPayload = {
    userId: isExistUser.id,
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    confing.jwt_secret as string,
    confing.expires_in as string
  );
  return {
    accessToken,
  };
};

export const AuthService = {
  logingUserForDb,
  refeshTokenInToForDb,
};
