import asyncCatch from "../utils/async.catch";

const createTemplate = asyncCatch(async (req, res) => {
  console.log("hell world ");
});
export const templateContllor = {
  createTemplate,
};
