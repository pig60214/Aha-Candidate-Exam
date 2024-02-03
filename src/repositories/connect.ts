import { Sequelize } from 'sequelize-typescript';
import * as pg from 'pg';
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
  logging: false,
  models: [User, LoginLog],
});

export default connection;
