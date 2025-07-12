import express from "express";
import { Traineercontllors } from "./trainne.contllor";

const route = express.Router();

route.get("/", Traineercontllors.getAllTrainees);

route.get("/:id", Traineercontllors.getSingleTrainees);

export const traineeRouter = route;
