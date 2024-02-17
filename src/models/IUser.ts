import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  Default,
  DataType,
} from 'sequelize-typescript';
import EnumSignUpWay from './enums/EnumSignUpWay';

export default interface IUser {
  email: string,
  /**
   * If google auth, default value is google account name. If local auth, default value is empty string.
   */
  name: string,
  /**
   * Has this user passed email verification?
   */
  hasEmailVerified: boolean,
  /**
   * There are two sign-up way. 1: local auth, 2: google auth
   */
  signUpWay: EnumSignUpWay,
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

  @AllowNull(false)
  @Column(DataType.INTEGER)
  signUpWay!: EnumSignUpWay;

  get Interface(): IUser {
    return {
      email: this.email,
      name: this.name,
      hasEmailVerified: this.hasEmailVerified,
      signUpWay: this.signUpWay,
    };
  }
}
