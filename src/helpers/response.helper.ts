import express from 'express';

type CustomError = {
  msg?: string;
  error?: string;
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  errors?: any;
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  [t: string]: any;
};
class ResponseHelper {
  badRequest(res: express.Response, error?: CustomError) {
    return res.status(400).send({ ...error });
  }

  unauthorized(res: express.Response, error?: CustomError) {
    return res.status(401).send({ ...error });
  }

  forbidden(res: express.Response, error?: CustomError) {
    return res.status(403).send({ ...error });
  }

  notFound(res: express.Response, error?: CustomError) {
    return res.status(404).send({ ...error });
  }

  internalServerError(res: express.Response, error?: CustomError) {
    return res.status(500).send({ ...error });
  }
}

export const response = new ResponseHelper();
