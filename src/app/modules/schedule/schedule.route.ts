import express from "express";
import { ScheduleControllers } from "./schedule.contllors";
import auth from "../../middlwares/auth";
import { Role } from "../../../../generated/prisma";

const route = express.Router();
route.post("/", auth(Role.ADMIN), ScheduleControllers.createSchedule);
route.get(
  "/",
  auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER),
  ScheduleControllers.getAllSchedule
);
route.get(
  "/:id",
  auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER),
  ScheduleControllers.getSingleSchedule
);
route.patch("/:id", auth(Role.ADMIN), ScheduleControllers.updateSingleSchedule);
route.delete(
  "/:id",
  auth(Role.ADMIN),
  ScheduleControllers.deleteSingleSchedule
);

export const scheduleRoute = route;
