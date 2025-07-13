import prisma from "../../utils/prisma";

const createScheduleForDb = async (payload: any) => {
  const { trainerId, startTime, endTime } = payload;

  if (!trainerId || !startTime || !endTime) {
    throw new Error("Missing required fields: trainerId, startTime, endTime.");
  }
  const startDateTime = new Date(startTime);
  const endDateTime = new Date(endTime);

  const durationInHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
  console.log(durationInHours);
  if (durationInHours !== 2) {
    throw new Error("Schedule duration must be exactly 2 hours.");
  }
  const trainerExists = await prisma.trainer.findUnique({
    where: { id: trainerId },
  });
  if (!trainerExists) {
    throw new Error("Invalid trainerId. Trainer does not exist.");
  }
  const startOfDay = new Date(startDateTime);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startDateTime);
  endOfDay.setHours(23, 59, 59, 999);

  const dailyScheduleCount = await prisma.schedule.count({
    where: {
      trainerId: trainerId,
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  console.log(dailyScheduleCount);
  if (dailyScheduleCount >= 5) {
    throw new Error("Trainer already has 5 classes scheduled for this day.");
  }

  const overlappingSchedule = await prisma.schedule.findFirst({
    where: {
      trainerId: trainerId,
      OR: [
        {
          startTime: { lte: endDateTime },
          endTime: { gte: startDateTime },
        },
      ],
    },
  });
  console.log(overlappingSchedule);
  if (overlappingSchedule) {
    throw new Error(
      "Schedule overlaps with an existing class for this trainer."
    );
  }

  const newSchedule = await prisma.schedule.create({
    data: {
      trainerId: trainerId,
      startTime: startDateTime,
      endTime: endDateTime,
    },
  });

  return newSchedule;
};

const getAllSchedules = async () => {
  const result = await prisma.schedule.findMany({});
  return result;
};
const getSingleScheduleForDb = async (id: string) => {
  const result = await prisma.schedule.findFirst({ where: { id: id } });
  return result;
};
const updateSingleScheduleForDb = async (id: string, payload: any) => {
  const { trainerId, startTime, endTime } = payload;
  const isExistSchedule = await prisma.schedule.findFirst({
    where: { id: id },
  });

  if (!isExistSchedule) {
    throw new Error("Schedule is not found!");
  }

  const startDateTime = startTime
    ? new Date(startTime)
    : isExistSchedule.startTime;
  const endDateTime = endTime ? new Date(endTime) : isExistSchedule.endTime;
  const updatedTrainerId = trainerId || isExistSchedule.trainerId;
  const durationInHours =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

  if (Math.abs(durationInHours - 2) > 0.01) {
    throw new Error("Schedule duration must be exactly 2 hours.");
  }

  if (updatedTrainerId && updatedTrainerId !== isExistSchedule.trainerId) {
    const trainerExists = await prisma.trainer.findUnique({
      where: { id: updatedTrainerId },
    });
    if (!trainerExists) {
      throw new Error("Invalid trainerId. Trainer does not exist.");
    }
  }

  const startOfDay = new Date(startDateTime);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(startDateTime);
  endOfDay.setHours(23, 59, 59, 999);
  const overlappingSchedule = await prisma.schedule.findFirst({
    where: {
      trainerId: updatedTrainerId,
      NOT: {
        id: id,
      },
      OR: [
        {
          startTime: { lte: endDateTime },
          endTime: { gte: startDateTime },
        },
      ],
    },
  });

  if (overlappingSchedule) {
    throw new Error(
      "Schedule overlaps with an existing class for this trainer."
    );
  }
  const updatedSchedule = await prisma.schedule.update({
    where: { id: id },
    data: {
      trainerId: updatedTrainerId,
      startTime: startDateTime,
      endTime: endDateTime,
    },
  });

  return updatedSchedule;
};

const deleteScheduleForDb = async (id: string) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id: id },
    include: {
      bookings: true,
    },
  });

  if (!schedule) {
    throw new Error("Schedule not found.");
  }

  const currentTime = new Date();

  if (currentTime > schedule.startTime && currentTime < schedule.endTime) {
    throw new Error("Cannot delete a running schedule.");
  }

  if (schedule.bookings && schedule.bookings.length > 0) {
    throw new Error(
      "Cannot delete schedule. Trainees have already booked this schedule."
    );
  }

  const deletedSchedule = await prisma.schedule.delete({
    where: { id: id },
  });

  return deletedSchedule;
};

export const ScheduleServices = {
  createScheduleForDb,
  getAllSchedules,
  getSingleScheduleForDb,
  updateSingleScheduleForDb,
  deleteScheduleForDb,
};
