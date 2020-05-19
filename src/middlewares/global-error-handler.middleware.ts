import { NextFunction, Request, Response } from 'express';

import { logger } from '../helpers/logger';
import { response } from '../helpers/response.helper';

/**
 * Wrapper for our async middlewares.
 * It is important to use it for async/await middlewares because it allows to write
 *
 * ```
 * function (req, res) {
 *    throw new Error('Something goes wrong');
 * }
 * ```
 *
 * And be sure that this will be handled by globalErrorHandlerMiddleware
 */
export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const globalErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = JSON.stringify(req.query);
  const body = JSON.stringify(req.body);
  logger.error(`InternalServerError ${req.method} ${req.path} query=${query}; body=${body}; `, err);

  const error = err instanceof Error ? err.toString() : err;
  response.internalServerError(res, { error });
};
