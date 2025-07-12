import express from "express";
import { BookingControllers } from "./booking.contllors";

const route = express.Router();
route.post("/", BookingControllers.createBooking);
route.get("/", BookingControllers.getAllBooking);
route.get("/:id", BookingControllers.getSingleBooking);
route.patch("/:id", BookingControllers.cancelBooking);

export const BookingRoute = route;
