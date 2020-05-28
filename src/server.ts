import express = require('express');
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import expressSwagger from 'express-swagger-generator';
/* eslint-disable */
dotenv.config();

import { routes } from './routes';
import { globalErrorHandlerMiddleware } from './middlewares/global-error-handler.middleware';
import { logger } from './helpers/logger';
import { getEnv, getServerPort } from './helpers/env.helper';
import path from 'path';
import { connectToDb /* , connectToDbSsh */ } from './db/db-connect';
import { swaggerOptions } from './services/swagger.service';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api', routes);
app.use(globalErrorHandlerMiddleware);
app.use('/api/static', express.static(path.join(__dirname, '/../static')));

app.get('/', function(req, res) {
  res.send('Hello World!');
});
if (getEnv() !== 'production') expressSwagger(app)(swaggerOptions);

const port = getServerPort();

Promise.all([
  /* example of connect to DB via SSH */
  // connectToDbSsh({
  //   dbUrl: process.env.DB_URL as string,
  //   host: process.env.SSH_HOSTNAME as string,
  //   username: process.env.SSH_USERNAME as string,
  //   privateKey: fs.readFileSync(process.env.SSH_PRIVATE_KEY_PATH as string),
  //   passphrase: process.env.SSH_PASSPHRASE as string,
  // }),

  /* example of connect to DB by only url */
  connectToDb(process.env.DB_URL as string),
]).then(() => {
  app.listen(port, function() {
    const serverStartedMessage = `Server listening on port ${port}!`;
    logger.info(`env - ${getEnv()}`);
    logger.info(serverStartedMessage);
  });
});
