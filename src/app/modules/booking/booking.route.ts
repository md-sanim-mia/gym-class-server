import express from "express";
import { BookingControllers } from "./booking.contllors";
import auth from "../../middlwares/auth";
import { Role } from "../../../../generated/prisma";

const route = express.Router();
route.post("/", auth(Role.TRAINEE), BookingControllers.createBooking);
route.get("/", auth(Role.ADMIN), BookingControllers.getAllBooking);
route.get(
  "/:id",
  auth(Role.TRAINEE, Role.ADMIN),
  BookingControllers.getSingleBooking
);
route.patch("/:id", auth(Role.TRAINEE), BookingControllers.cancelBooking);

export const BookingRoute = route;
