/* eslint-disable class-methods-use-this */
import IUpdatePasswordRequest from '../models/IUpdatePasswordRequest';
import IUser from '../models/IUser';

const USER_LIST = [
  {
    email: 'string',
    name: 'tttt',
  },
  {
    email: 'string2',
    name: 'tttt',
  },
  {
    email: 'pig60214@gmail.com',
    name: 'Yuxiu Chen',
  },
];

export default class UserService {
  async updatePassword(email: string, body: IUpdatePasswordRequest): Promise<boolean> {
    if (email === 'string2') {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  async updateUserName(email: string, name: string): Promise<boolean> {
    if (email === 'string2') {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }

  async getUserProfile(email: string): Promise<IUser | undefined> {
    const user = USER_LIST.find((u) => u.email === email);
    return Promise.resolve(user);
  }
}
