import express = require('express');
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import cors from 'cors';
/* eslint-disable */
dotenv.config();

import { routes } from './routes';
import { globalErrorHandlerMiddleware } from './middlewares/global-error-handler.middleware';
import { logger } from './helpers/logger';
import { getEnv, getServerPort } from './helpers/env.helper';
import { addSwaggerRoute } from './services/swagger.service';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api', routes);
app.use(globalErrorHandlerMiddleware);
app.use('/api/static', express.static(path.join(__dirname, '/../static')));

app.get('/', function(req, res) {
  res.send('Hello World!');
});
if (getEnv() !== 'production') addSwaggerRoute(app);

const port = getServerPort();

app.listen(port, function() {
  const serverStartedMessage = `Server listening on port ${port}!`;
  logger.info(`env - ${getEnv()}`);
  logger.info(serverStartedMessage);
});
