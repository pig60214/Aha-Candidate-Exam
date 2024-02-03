/* eslint-disable class-methods-use-this */
import ApiResponseError from '../models/ApiResponseError';
import { ISignUpRequest } from '../models/ISignUpRequest';
import IUser, { User } from '../models/IUser';
import EnumResponseError from '../models/enums/EnumResponseError';

export default class UserRepository {
  createUser = async (request: ISignUpRequest): Promise<IUser> => {
    try {
      const user = User.build({ email: request.email, password: request.password });
      await user.save();
      const response: IUser = user.Interface;
      return response;
    } catch (error: any) {
      console.error(error);

      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ApiResponseError(EnumResponseError.EmailExists);
      }
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  };

  emailVerifiedSuccess = async (email: string): Promise<number> => {
    try {
      const [rowsUpdated] = await User.update(
        { hasEmailVerified: true },
        { where: { email } },
      );
      return rowsUpdated;
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  };

  getUserProfile = async (email: string): Promise<IUser | null> => {
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
  };
}
