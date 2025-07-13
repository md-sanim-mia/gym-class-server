import express from "express";
import { Traineercontllors } from "./trainne.contllor";
import auth from "../../middlwares/auth";
import { Role } from "../../../../generated/prisma";

const route = express.Router();
route.post("/", Traineercontllors.createdTrainee);
route.get("/", auth(Role.ADMIN), Traineercontllors.getAllTrainees);

route.get(
  "/:id",
  auth(Role.ADMIN, Role.TRAINEE),
  Traineercontllors.getSingleTrainees
);
route.put(
  "/profile-update",
  auth(Role.TRAINEE),
  Traineercontllors.updateSingleTrainees
);

export const traineeRouter = route;
