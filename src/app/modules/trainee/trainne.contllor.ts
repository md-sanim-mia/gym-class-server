import { JwtPayload } from "jsonwebtoken";
import asyncCatch from "../../utils/async.catch";
import { TraineeServices } from "./trainee.services";
const createdTrainee = asyncCatch(async (req, res) => {
  const result = await TraineeServices.createTraineeForDb(req.body);
  console.log(result);
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "Trainee succcess fully created",
    data: result,
  });
});
const getAllTrainees = asyncCatch(async (req, res) => {
  const result = await TraineeServices.getAllTraineeForDb();
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "get All Trainees",
    data: result,
  });
});
const getSingleTrainees = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await TraineeServices.getSingleTraineeForDb(id);
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "get single Trainees",
    data: result,
  });
});
const updateSingleTrainees = asyncCatch(async (req, res) => {
  const { userId } = req.user as JwtPayload;
  const result = await TraineeServices.updateSingleTraineeForDb(
    userId,
    req.body
  );
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "updated single Trainees",
    data: result,
  });
});

export const Traineercontllors = {
  getAllTrainees,
  getSingleTrainees,
  updateSingleTrainees,
  createdTrainee,
};
