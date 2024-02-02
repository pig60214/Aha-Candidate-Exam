/* eslint-disable class-methods-use-this */
import { ILocalAuthRequest } from '../models/ILocalAuthRequest';
import { ISignUpRequest } from '../models/ISignUpRequest';
import IUser from '../models/IUser';
import UserRepository from '../repositories/UserRepository';

const USER_LIST = [
  {
    email: 'string',
    password: 'string',
    name: 'tttt',
    hasEmailVerified: true,
  },
  {
    email: 'string2',
    password: 'string',
    name: 'tttt2',
    hasEmailVerified: false,
  },
];

export default class AuthService {
  private userRepository = new UserRepository();

  async createUser(request: ISignUpRequest): Promise<IUser> {
    const user = await this.userRepository.createUser(request);
    return user;
  }

  async findUser(request: ILocalAuthRequest): Promise<IUser | undefined> {
    const user = USER_LIST.find((u) => u.email === request.email && u.password === request.password);
    return Promise.resolve(user);
  }
}
