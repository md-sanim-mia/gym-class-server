import express from "express";
import { usercontllors } from "./user.contllor";
import auth from "../../middlwares/auth";
import { Role } from "../../../../generated/prisma";
const route = express.Router();

route.get("/", auth(Role.ADMIN), usercontllors.getAllUsers);
route.get(
  "/:id",
  auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER),
  usercontllors.getSingleUsers
);

export const userRouter = route;
