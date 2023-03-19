import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import express, { Express } from 'express';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity.js';
import { tasksRouter } from './src/tasks/tasks.router.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app: Express = express();
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/dist', )));

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.MYSQLHOST,
//   port: 7612,
//   username: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
//   entities: [Task],
//   synchronize: true,
// });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  entities: [Task],
  synchronize: false,
});

const port = process.env.PORT;

AppDataSource
  .initialize()
  .then(() => {
    app.listen(port);
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error('Error!!! during Data Source initialization', err);
  });

app.use('/', tasksRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});
