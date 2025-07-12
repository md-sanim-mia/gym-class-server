import express from "express";
import { userRouter } from "../modules/users/user.route";
import { traineeRouter } from "../modules/trainee/trainee.route";

const router = express.Router();

const moduleRouters = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/traines",
    route: traineeRouter,
  },
];

moduleRouters.forEach((item) => router.use(item.path, item.route));

export default router;
