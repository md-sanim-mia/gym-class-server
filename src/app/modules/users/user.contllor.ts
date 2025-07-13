import asyncCatch from "../../utils/async.catch";
import { userServices } from "./user.service";

//Creates a new user and saves them to the database

const getAllUsers = asyncCatch(async (req, res) => {
  const result = await userServices.getAllUsersForDb();
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "get All users",
    data: result,
  });
});
const getSingleUsers = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getSingleUsersForDb(id);
  res.status(200).send({
    success: true,
    statusCode: 201,
    message: "get single users",
    data: result,
  });
});

export const usercontllors = {
  getAllUsers,
  getSingleUsers,
};
