import 'jest';
import AuthService from '../../src/services/AuthService';
import UserRepository from '../../src/repositories/UserRepository';

describe('AuthService', () => {
  it('create user and send email verification', async () => {
    const userRepository = new UserRepository();
    const mockCreateUser = jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce({
      email: 'test@test.com',
      name: 'test',
      hasEmailVerified: false,
      signUpWay: 1,
    });

    const authService = new AuthService(userRepository);
    const mockSendEmailVerification = jest.spyOn(authService, 'sendEmailVerification').mockImplementationOnce(jest.fn());

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