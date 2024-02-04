import { Sequelize } from 'sequelize-typescript';
import * as pg from 'pg';
import { ConnectionError } from 'sequelize';
import { User } from '../models/IUser';
import LoginLog from '../models/LoginLog';

const connection = new Sequelize({
  dialect: 'postgres',
  dialectModule: pg,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  retry: {
    match: [
      ConnectionError,
    ],
    max: 3,
  },
  logging: false,
  models: [User, LoginLog],
});

export default connection;
