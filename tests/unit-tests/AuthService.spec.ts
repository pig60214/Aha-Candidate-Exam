import 'jest';
import AuthService from '../../src/services/AuthService';
import UserRepository from '../../src/repositories/UserRepository';
import LoginLogRepository from '../../src/repositories/LoginLogRepository';

describe('AuthService', () => {
  let loginLogRepository = new LoginLogRepository();
  let userRepository = new UserRepository();
  let authService = new AuthService(userRepository, loginLogRepository);

  beforeEach(() => {
    loginLogRepository = new LoginLogRepository();
    userRepository = new UserRepository();
    authService = new AuthService(userRepository, loginLogRepository);
  });

  it('[createUser] create user and send email verification', async () => {
    const mockCreateUser = jest.spyOn(userRepository, 'createUser').mockResolvedValue({
      email: 'test@test.com',
      name: 'test',
      hasEmailVerified: false,
      signUpWay: 1,
    });

    const mockSendEmailVerification = jest.spyOn(authService, 'sendEmailVerification').mockImplementation(jest.fn());

    const signUpInfo = {
      email: 'test@test.com',
      password: '123',
      confirmPassword: '123',
    };

    await authService.createUser(signUpInfo);

    expect(mockCreateUser).toHaveBeenCalledWith(signUpInfo);
    expect(mockSendEmailVerification).toHaveBeenCalledTimes(1);
  });
});