import express from "express";
import { Trainercontllors } from "./trainer.contllors";

const route = express.Router();

route.post("/", Trainercontllors.createTrainer);
route.get("/", Trainercontllors.getAllTrainer);
route.get("/:id", Trainercontllors.getSingleTrainer);

export const TrainerRouter = route;
