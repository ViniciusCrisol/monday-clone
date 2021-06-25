import 'reflect-metadata';
import 'dotenv/config';

import serverMonitor from 'express-status-monitor';
import compression from 'compression';
import { errors } from 'celebrate';
import express from 'express';
import cors from 'cors';

import '@shared/container';
import 'express-async-errors';

import routes from './routes';
import { createDbConnection } from '@shared/infra/typeorm';
import errorHandler from '@shared/infra/http/middlewares/errorHandler';

createDbConnection();
const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(errorHandler);

app.use('/server/server-health', serverMonitor());

app.listen(8080, () => {
  console.log('🚀 server started at port 8080!');
});
