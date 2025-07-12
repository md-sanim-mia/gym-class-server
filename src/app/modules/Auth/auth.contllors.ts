import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import sendResponse from "../../utils/send.response";
import asyncCatch from "../../utils/async.catch";
import { AuthService } from "./auth.service";

const logingUser = asyncCatch(async (req, res) => {
  const result = await AuthService.logingUserForDb(req.body);

  res.cookie("refeshToken", result.refeshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Successfully login",
    data: {
      accessToken: result.accessToken,
    },
  });
});
const refeshToken = asyncCatch(async (req, res) => {
  const { refeshToken } = req.cookies;
  const result = await AuthService.refeshTokenInToForDb(refeshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "refesh token Successfully get the access",
    data: result,
  });
});

export const AuthController = {
  logingUser,
  refeshToken,
};
