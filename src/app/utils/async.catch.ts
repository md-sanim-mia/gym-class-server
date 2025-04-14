import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncCatch = (fan: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fan(req, res, next)).catch((error) => next(error));
  };
};

export default asyncCatch;
