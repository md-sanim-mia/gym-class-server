import { JwtPayload } from "jsonwebtoken";
import asyncCatch from "../../utils/async.catch";
import { ScheduleServices } from "./schedule.services";

const createSchedule = asyncCatch(async (req, res) => {
  const result = await ScheduleServices.createScheduleForDb(req.body);
  res.status(201).send({
    success: true,
    statusCode: 201,
    message: "Schedule successfully created",
    data: result,
  });
});

const getAllSchedule = asyncCatch(async (req, res) => {
  const result = await ScheduleServices.getAllSchedules();

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "All schedules retrieved",
    data: result,
  });
});

const getSingleSchedule = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.getSingleScheduleForDb(id);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "Single schedule retrieved",
    data: result,
  });
});
const updateSingleSchedule = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.updateSingleScheduleForDb(id, req.body);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "update Single schedule for the db",
    data: result,
  });
});
const deleteSingleSchedule = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.deleteScheduleForDb(id);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "deleted Single schedule for the db",
    data: null,
  });
});
const mySchedules = asyncCatch(async (req, res) => {
  const { userId } = req.user as JwtPayload;
  const result = await ScheduleServices.myScheduleForDb(userId);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "Get my all schedules for the db",
    data: result,
  });
});

export const ScheduleControllers = {
  createSchedule,
  getAllSchedule,
  getSingleSchedule,
  updateSingleSchedule,
  deleteSingleSchedule,
  mySchedules,
};
