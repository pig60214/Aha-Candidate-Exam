import { ILocalAuthRequest } from '../models/ILocalAuthRequest';
import IUser from '../models/IUser';

const USER_LIST = [
  {
    email: 'string',
    password: 'string',
    name: 'tttt',
  },
];

export default class AuthService {
  async findUser(request: ILocalAuthRequest): Promise<IUser | undefined> {
    const user = USER_LIST.find((u) => u.email === request.email && u.password === request.password);
    return Promise.resolve(user);
  }
}
