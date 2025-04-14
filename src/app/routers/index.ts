import express from "express";
import app from "../../app";
import { templateRouter } from "../exampole/exampole.route";

const router = express.Router();

const moduleRouters = [
  {
    path: "/template",
    route: templateRouter, // this is example of route use your route or pathe
  },
];

moduleRouters.forEach((item) => router.use(item.path, item.route));

export default router;
