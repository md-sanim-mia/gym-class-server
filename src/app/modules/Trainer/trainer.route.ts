import express from "express";
import { Trainercontllors } from "./trainer.contllors";
import auth from "../../middlwares/auth";
import { Role } from "../../../../generated/prisma";

const route = express.Router();

route.post("/", auth(Role.ADMIN), Trainercontllors.createTrainer);
route.get("/", auth(Role.ADMIN), Trainercontllors.getAllTrainer);
route.get(
  "/:id",
  auth(Role.ADMIN, Role.TRAINER),
  Trainercontllors.getSingleTrainer
);
route.patch("/:id", auth(Role.ADMIN), Trainercontllors.updateSingleTrainer);
route.delete("/:id", auth(Role.ADMIN), Trainercontllors.deleteSingleTrainer);

export const TrainerRouter = route;
