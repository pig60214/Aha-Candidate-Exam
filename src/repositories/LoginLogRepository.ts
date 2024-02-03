/* eslint-disable class-methods-use-this */
import ApiResponseError from '../models/ApiResponseError';
import LoginLog from '../models/LoginLog';
import EnumResponseError from '../models/enums/EnumResponseError';

export default class LoginLogRepository {
  async addLoginLog(email: string) {
    try {
      const log = LoginLog.build({ email });
      await log.save();
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }
}