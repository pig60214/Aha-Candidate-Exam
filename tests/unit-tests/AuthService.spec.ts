import 'jest';
import AuthService from '../../src/services/AuthService';
import UserRepository from '../../src/repositories/UserRepository';
import LoginLogRepository from '../../src/repositories/LoginLogRepository';

const fakeUserData = {
  email: 'test@test.com',
  name: 'test',
  hasEmailVerified: false,
  signUpWay: 1,
};
const fakeToken = 'ThisIsFakeToken';

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
    const mockCreateUser = jest.spyOn(userRepository, 'createUser').mockResolvedValue(fakeUserData);

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

  it('[loginFromGoogleAuth] user exist > add login log > return token', async () => {
    const mockGetUserProfile = jest.spyOn(userRepository, 'getUserProfile').mockResolvedValue(fakeUserData);
    const mockCreateUserFromGoogleAuth = jest.spyOn(userRepository, 'createUserFromGoogleAuth').mockImplementation(jest.fn());

    const mockGenerateJwt = jest.spyOn(authService, 'generateJwt').mockReturnValue(fakeToken);

    const mockAddLoginLog = jest.spyOn(loginLogRepository, 'addLoginLog').mockImplementation(jest.fn());

    const token = await authService.loginFromGoogleAuth(fakeUserData.email, fakeUserData.name);

    expect(mockGetUserProfile).toHaveBeenCalledWith(fakeUserData.email);
    expect(mockCreateUserFromGoogleAuth).toHaveBeenCalledTimes(0);

    expect(mockAddLoginLog).toHaveBeenCalledTimes(1);
    expect(mockAddLoginLog).toHaveBeenCalledWith(fakeUserData.email);
    expect(mockGenerateJwt).toHaveBeenCalledWith(fakeUserData);

    expect(token).toBe(fakeToken);
  });

  it('[loginFromGoogleAuth] if user not exist, should create user', async () => {
    userRepository.getUserProfile = jest.fn().mockResolvedValue(null);
    const mockCreateUserFromGoogleAuth = jest.spyOn(userRepository, 'createUserFromGoogleAuth').mockResolvedValue(fakeUserData);

    loginLogRepository.addLoginLog = jest.fn().mockImplementation(jest.fn());

    await authService.loginFromGoogleAuth(fakeUserData.email, fakeUserData.name);

    expect(mockCreateUserFromGoogleAuth).toHaveBeenCalledWith(fakeUserData.email, fakeUserData.name);
  });
});