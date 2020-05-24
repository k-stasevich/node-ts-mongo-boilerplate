import express from 'express';
import { validationResult } from 'express-validator';
import { response } from '../helpers/response.helper';

/**
 * Responsible for responding with bad request when express-validator
 * has errors
 */
export const badRequestMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return response.badRequest(res, { errors: validation.array() });
  }

  next();
};
