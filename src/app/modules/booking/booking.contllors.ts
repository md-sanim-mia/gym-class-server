import { JwtPayload } from "jsonwebtoken";
import asyncCatch from "../../utils/async.catch";
import { BookingServices } from "./booking.service";

const createBooking = asyncCatch(async (req, res) => {
  const user = req.user as JwtPayload;
  const userId = user.userId as string;
  const result = await BookingServices.createBookingForDb(req.body, userId);
  res.status(201).send({
    success: true,
    statusCode: 201,
    message: "Booking successfully created",
    data: result,
  });
});

const getAllBooking = asyncCatch(async (req, res) => {
  const result = await BookingServices.getAllBookings();

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "All Bookings retrieved",
    data: result,
  });
});

const getSingleBooking = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getSingleBookingForDb(id);
  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "Single Booking retrieved",
    data: result,
  });
});
const cancelBooking = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user as JwtPayload;
  const result = await BookingServices.cancelBookingForDb(id, userId);

  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "Your Booking is canceled",
    data: result,
  });
});
const myBooking = asyncCatch(async (req, res) => {
  const { userId } = req.user as JwtPayload;
  const result = await BookingServices.getMyBookingsForDb(userId);
  res.status(200).send({
    success: true,
    statusCode: 200,
    message: "My bookings fetched successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  cancelBooking,
  myBooking,
};
