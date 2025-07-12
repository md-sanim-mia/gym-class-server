import express from "express";
import { ScheduleControllers } from "./schedule.contllors";

const route = express.Router();
route.post("/", ScheduleControllers.createSchedule);
route.get("/", ScheduleControllers.getAllSchedule);
route.get("/:id", ScheduleControllers.getSingleSchedule);

export const scheduleRoute = route;
