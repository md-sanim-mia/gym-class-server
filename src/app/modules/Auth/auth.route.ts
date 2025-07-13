import express from "express";
import { AuthController } from "./auth.contllors";
const route = express.Router();

route.post("/login", AuthController.logingUser);

export const AuthRouter = route;
