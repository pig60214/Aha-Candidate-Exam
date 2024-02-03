import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './IUser';

@Table
export default class LoginLog extends Model {
  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userEmail!: string;

  @BelongsTo(() => User, 'userEmail')
  user!: User;
}
