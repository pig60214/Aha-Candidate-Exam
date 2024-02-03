/* eslint-disable class-methods-use-this */
import ApiResponseError from '../models/ApiResponseError';
import IUser from '../models/IUser';
import EnumResponseError from '../models/enums/EnumResponseError';
import UserRepository from '../repositories/UserRepository';

export default class UserService {
  private userRepository = new UserRepository();

  async updatePassword(email: string, oldPassword: string, newPassword: string) {
    const rowsUpdated = await this.userRepository.updatePassword(email, oldPassword, newPassword);
    if (rowsUpdated === 0) {
      throw new ApiResponseError(EnumResponseError.OldPasswordIsWrong);
    }
  }

  async updateName(email: string, name: string) {
    const rowsUpdated = await this.userRepository.updateName(email, name);
    if (rowsUpdated === 0) {
      throw new ApiResponseError(EnumResponseError.PleaseLoginFirst);
    }
  }

  async getUserProfile(email: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserProfile(email);
    return user;
  }
}
