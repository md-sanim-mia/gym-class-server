import express from "express";
import { templateContllor } from "./exampole.contllors";
const route = express.Router();

route.post("/", templateContllor.createTemplate);

export const templateRouter = route;
