import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './IUser';

@Table
export default class LoginLog extends Model {
  @ForeignKey(() => User)
  @Column(DataType.STRING)
  email!: string;
}