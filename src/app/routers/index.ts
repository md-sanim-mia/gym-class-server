import express from "express";
import { userRouter } from "../modules/users/user.route";
import { traineeRouter } from "../modules/trainee/trainee.route";
import { TrainerRouter } from "../modules/Trainer/trainer.route";

const router = express.Router();

const moduleRouters = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/trainees",
    route: traineeRouter,
  },
  {
    path: "/trainers",
    route: TrainerRouter,
  },
];

moduleRouters.forEach((item) => router.use(item.path, item.route));

export default router;
