/* eslint-disable class-methods-use-this */
import { Op } from 'sequelize';
import ApiResponseError from '../models/ApiResponseError';
import { ILoginReportDataRow } from '../models/ILoginReportDataRow';
import { User } from '../models/IUser';
import { IUserStatisticsResponse } from '../models/IUserStatisticsResponse';
import LoginLog from '../models/LoginLog';
import EnumResponseError from '../models/enums/EnumResponseError';
import connection from './connect';

export default class LoginLogRepository {
  async getUsersStatistics(): Promise<IUserStatisticsResponse> {
    try {
      const signedUpUserNumber = await User.count();

      const todayStart = new Date(new Date().setUTCHours(0, 0, 0, 0));
      const todayEnd = new Date(new Date().setUTCHours(23, 59, 59, 999));
      const toadyActiveSessionUserNumber = await LoginLog.count({
        where: { createdAt: { [Op.between]: [todayStart, todayEnd] } },
      });

      const sevenDaysAgo = new Date(new Date().setUTCHours(0, 0, 0, 0));
      sevenDaysAgo.setDate(sevenDaysAgo.getUTCDate() - 7);
      const weekActiveSessionUserNumber = await LoginLog.count({
        where: { createdAt: { [Op.gte]: sevenDaysAgo } },
      });
      const weekActiveSessionUserAverageNumber = weekActiveSessionUserNumber / 7;

      return {
        signedUpUserNumber,
        toadyActiveSessionUserNumber,
        weekActiveSessionUserAverageNumber,
      };
    } catch (error) {
      console.error(error);
      throw new ApiResponseError(EnumResponseError.InternalError);
    }
  }

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
