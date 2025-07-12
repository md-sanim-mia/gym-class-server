import asyncCatch from "../../utils/async.catch";
import { TraineeServices } from "./trainee.services";

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

export const Traineercontllors = {
  getAllTrainees,
  getSingleTrainees,
};
