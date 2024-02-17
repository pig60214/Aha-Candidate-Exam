import IUser from './IUser';

export interface ILoginResponse extends IUser {
  /**
   * A JWT token for login status.
   * Put in request header. header['authorization'] = 'bearer ${token}'
   */
  token: string;
}
