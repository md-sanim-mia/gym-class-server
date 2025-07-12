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
export const ScheduleServices = {
  createScheduleForDb,
  getAllSchedules,
  getSingleScheduleForDb,
};
