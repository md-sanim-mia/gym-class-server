import asyncCatch from "../../utils/async.catch";
import { TrainerServices } from "./trainer.services";

//Creates a new trainer and saves them to the database
const createTrainer = asyncCatch(async (req, res) => {
  const result = await TrainerServices.createTrainerForDb(req.body);
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "Trainer succcess fully created",
    data: result,
  });
});
const getAllTrainer = asyncCatch(async (req, res) => {
  const result = await TrainerServices.getAllTrainersForDb();
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "get All Trainer",
    data: result,
  });
});
const getSingleTrainer = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await TrainerServices.getSingleTrainersForDb(id);
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "get single Trainer",
    data: result,
  });
});
const updateSingleTrainer = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await TrainerServices.updateSingleTrainersForDb(id, req.body);
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "updated the single Trainer",
    data: result,
  });
});
const deleteSingleTrainer = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await TrainerServices.deleteSingleTrainerForDb(id);
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "delte the single Trainer",
    data: null,
  });
});

export const Trainercontllors = {
  createTrainer,
  getAllTrainer,
  getSingleTrainer,
  updateSingleTrainer,
  deleteSingleTrainer,
};
