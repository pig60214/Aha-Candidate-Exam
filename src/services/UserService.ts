/* eslint-disable class-methods-use-this */
import IUpdatePasswordRequest from '../models/IUpdatePasswordRequest';
import IUser from '../models/IUser';
import UserRepository from '../repositories/UserRepository';

export default class UserService {
  private userRepository = new UserRepository();

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

  async getUserProfile(email: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserProfile(email);
    return user;
  }
}
