import express from "express";
import { usercontllors } from "./user.contllor";
const route = express.Router();

route.post("/", usercontllors.createUser);
route.get("/", usercontllors.getAllUsers);
route.get("/:id", usercontllors.getSingleUsers);

export const userRouter = route;
