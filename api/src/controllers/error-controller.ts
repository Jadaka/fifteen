import { Request, Response, NextFunction } from 'express';

import { StatusCodes, ErrorMessage } from '../contracts';

export const notFound = (req: Request, res: Response): void => {
  res.status(StatusCodes.NotFound);
  const errorMessage: ErrorMessage = {
    message: 'That item could not be found',
  };
  res.json(errorMessage);
};

export const serverError = (
    err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log(err);
  res.status(StatusCodes.ServerError);
  const errorMessage: ErrorMessage = {
    message: 'That item could not be found',
  };
  res.json(errorMessage);
};
