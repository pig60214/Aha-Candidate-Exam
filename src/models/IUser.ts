import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
} from 'sequelize-typescript';

export default interface IUser {
  email: string,
  name: string,
}

@Table
export class User extends Model implements IUser {
  @PrimaryKey
  @Column
  email!: string;

  @AllowNull(false)
  @Default('')
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  password!: string;
}
