import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import express from 'express';
import cors from 'cors';

import '@shared/container';
import 'express-async-errors';
import connection from '@shared/infra/typeorm';
import errorHandler from '@shared/infra/http/middlewares/errorHandler';

import routes from './routes';

connection.create();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(8080, () => {
  console.log('🚀 server started!');
});
