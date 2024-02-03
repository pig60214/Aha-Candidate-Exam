import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  DataType,
} from 'sequelize-typescript';

export default interface IUser {
  email: string,
  name: string,
  hasEmailVerified: boolean,
}

@Table
export class User extends Model implements IUser {
  @PrimaryKey
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Default('')
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  hasEmailVerified!: boolean;

  get Interface(): IUser {
    return {
      email: this.email,
      name: this.name,
      hasEmailVerified: this.hasEmailVerified,
    };
  }
}
