import express from "express";
import { userRouter } from "../modules/users/user.route";
import { traineeRouter } from "../modules/trainee/trainee.route";
import { TrainerRouter } from "../modules/Trainer/trainer.route";
import { scheduleRoute } from "../modules/schedule/schedule.route";
import { BookingRoute } from "../modules/booking/booking.route";
import { AuthRouter } from "../modules/Auth/auth.route";

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
  {
    path: "/schedule",
    route: scheduleRoute,
  },
  {
    path: "/booking",
    route: BookingRoute,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
];

moduleRouters.forEach((item) => router.use(item.path, item.route));

export default router;
