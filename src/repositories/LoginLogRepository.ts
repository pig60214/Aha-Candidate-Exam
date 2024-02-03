/* eslint-disable class-methods-use-this */
import ApiResponseError from '../models/ApiResponseError';
import { ILoginReportDataRow } from '../models/ILoginReportDataRow';
import { User } from '../models/IUser';
import LoginLog from '../models/LoginLog';
import EnumResponseError from '../models/enums/EnumResponseError';
import connection from './connect';

export default class LoginLogRepository {
  async getLoginReport(): Promise<ILoginReportDataRow[]> {
    try {
      const logs = await LoginLog.findAll({
        attributes: [
          'userEmail',
          [connection.fn('COUNT', connection.col('userEmail')), 'loginTimes'],
          [connection.fn('MAX', connection.col('LoginLog.createdAt')), 'lastSession'],
        ],
        include: [{
          model: User,
          attributes: ['createdAt'],
        }],
        group: ['userEmail', 'email'],
      });

      const loginReportDataRows: ILoginReportDataRow[] = logs.map((log) => {
        const datarow: ILoginReportDataRow = {
          email: log.userEmail,
          signUp: log.user.createdAt,
          loginTimes: log.dataValues.loginTimes,
          lastSession: log.dataValues.lastSession,
        };
        return datarow;
      });
      return loginReportDataRows;
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

  async addLoginLog(email: string) {
    try {
      const log = LoginLog.build({ userEmail: email });
      await log.save();
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }
}
