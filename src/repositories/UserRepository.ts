/* eslint-disable class-methods-use-this */
import ApiResponseError from '../models/ApiResponseError';
import { ILocalAuthRequest } from '../models/ILocalAuthRequest';
import { ISignUpRequest } from '../models/ISignUpRequest';
import IUser, { User } from '../models/IUser';
import EnumResponseError from '../models/enums/EnumResponseError';
import EnumSignUpWay from '../models/enums/EnumSignUpWay';

export default class UserRepository {
  async updatePassword(email: string, oldPassword: string, newPassword: string): Promise<number> {
    try {
      const [rowsUpdated] = await User.update(
        { password: newPassword },
        { where: { email, password: oldPassword } },
      );
      return rowsUpdated;
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

  async updateName(email: string, name: string): Promise<number> {
    try {
      const [rowsUpdated] = await User.update(
        { name },
        { where: { email } },
      );
      return rowsUpdated;
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

  async createUserFromGoogleAuth(email: string, name: string) {
    try {
      const userFromDb = User.build({
        email,
        password: '',
        name,
        hasEmailVerified: true,
        signUpWay: EnumSignUpWay.Google,
      });
      await userFromDb.save();
      const response: IUser = userFromDb.Interface;
      return response;
    } catch (error: any) {
      console.error(error);

      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiResponseError(EnumResponseError.EmailExists);
      }
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

  async createUser(request: ISignUpRequest): Promise<IUser> {
    try {
      const user = User.build({ email: request.email, password: request.password, signUpWay: EnumSignUpWay.Local });
      await user.save();
      const response: IUser = user.Interface;
      return response;
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiResponseError(EnumResponseError.EmailExists);
      }

      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

  async emailVerifiedSuccess(email: string): Promise<[number, User]> {
    try {
      const [rowsUpdated, [updatedUser]] = await User.update(
        { hasEmailVerified: true },
        { where: { email }, returning: true },
      );
      return [rowsUpdated, updatedUser];
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

  async getUserProfile(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const response: IUser = user.Interface;
        return response;
      }
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
    return null;
  }

  async login(request: ILocalAuthRequest): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email: request.email } });
      return user;
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }
}
