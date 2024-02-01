import IUser from '../models/IUser';

const USER_LIST = [
  {
    email: 'string',
    name: 'tttt',
  },
  {
    email: 'pig60214@gmail.com',
    name: 'Yuxiu Chen',
  },
];

export default class UserService {
  async getUserProfile(email: string): Promise<IUser | undefined> {
    const user = USER_LIST.find((u) => u.email === email);
    return Promise.resolve(user);
  }
}
