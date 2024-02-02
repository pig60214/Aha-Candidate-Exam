/* eslint-disable class-methods-use-this */
import IUser, { User } from '../models/IUser';

export default class UserRepository {
  // createUser = async (name: string, email: string, password: string): Promise<User> => {
  //   const user = User.build({ name, email, password });
  //   return await user.save();
  // };

  getUserProfile = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const response: IUser = {
        email: user.email,
        name: user.name,
      };
      return response;
    }

    return null;
  };
}
