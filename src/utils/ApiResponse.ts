import { Response } from 'express';

export const sendSuccess = (res: Response, data: unknown, message = 'Success', statusCode = 200): void => {
  res.status(statusCode).json({ success: true, message, data });
};

export const sendError = (res: Response, message = 'Error', statusCode = 500, error?: unknown): void => {
  res.status(statusCode).json({ success: false, message, error });
};


export const sendCreated = (res: Response, data: unknown, message = 'Created'): void => {
  sendSuccess(res, data, message, 201);
};
