import prisma from "../../utils/prisma";

const createBookingForDb = async (payload: any) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id: payload.scheduleId },
  });

  if (!schedule) {
    throw new Error("Schedule not found.");
  }

  if (schedule.bookedTrainees >= schedule.capacity) {
    throw new Error(
      "Class schedule is full. Maximum 10 trainees allowed per schedule."
    );
  }

  const existingBookings = await prisma.booking.findMany({
    where: {
      traineeId: payload.traineeId,
    },
    include: {
      schedule: true,
    },
  });

  console.log("this is check", existingBookings);
  const newScheduleStartTime = schedule.startTime.getTime();
  const newScheduleEndTime = schedule.endTime.getTime();
  const isOverlapping = existingBookings.some((booking) => {
    const existingStart = booking.schedule.startTime.getTime();
    const existingEnd = booking.schedule.endTime.getTime();

    return (
      newScheduleStartTime < existingEnd && newScheduleEndTime > existingStart
    );
  });
  if (isOverlapping) {
    throw new Error("Trainee already has a booking in the same time slot.");
  }
  const result = await prisma.$transaction(async (transactionClient) => {
    const incrementBookingTrainee = await transactionClient.schedule.update({
      where: { id: payload.scheduleId },
      data: {
        bookedTrainees: {
          increment: 1,
        },
      },
    });

    const booking = await prisma.booking.create({
      data: {
        traineeId: payload.traineeId,
        scheduleId: payload.scheduleId,
      },
    });
    return booking;
  });
  return result;
};

const cancelBookingForDb = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (booking.traineeId !== userId) {
    throw new Error("Unauthorized access. You cannot cancel this booking.");
  }
  if (booking.isCanceled) {
    throw new Error("Booking is already canceled.");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const canceledBooking = await transactionClient.booking.update({
      where: { id: bookingId },
      data: { isCanceled: true },
    });

    const dicrementBookingTrainee = await transactionClient.schedule.update({
      where: { id: booking.scheduleId },
      data: {
        bookedTrainees: {
          decrement: 1,
        },
      },
    });
    return canceledBooking;
  });

  return result;
};

const getAllBookings = async () => {
  const result = await prisma.booking.findMany({});
  return result;
};
const getSingleBookingForDb = async (id: string) => {
  const result = await prisma.booking.findFirst({ where: { id: id } });
  return result;
};
export const BookingServices = {
  createBookingForDb,
  getAllBookings,
  getSingleBookingForDb,
  cancelBookingForDb,
};
