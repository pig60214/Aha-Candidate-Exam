/* eslint-disable class-methods-use-this */
import { ILocalAuthRequest } from '../models/ILocalAuthRequest';
import IUser from '../models/IUser';

const USER_LIST = [
  {
    email: 'string',
    password: 'string',
    name: 'tttt',
  },
  {
    email: 'string2',
    password: 'string',
    name: 'tttt2',
  },
];

export default class AuthService {
  async findUser(request: ILocalAuthRequest): Promise<IUser | undefined> {
    const user = USER_LIST.find((u) => u.email === request.email && u.password === request.password);
    return Promise.resolve(user);
  }
}
