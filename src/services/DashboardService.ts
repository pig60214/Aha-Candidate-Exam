/* eslint-disable class-methods-use-this */
import { ILoginReportDataRow } from '../models/ILoginReportDataRow';
import { IUserStatisticsResponse } from '../models/IUserStatisticsResponse';
import LoginLogRepository from '../repositories/LoginLogRepository';

export default class DashboardService {
  private loginLogRepository = new LoginLogRepository();

  async getUsersStatistics(): Promise<IUserStatisticsResponse> {
    const data = await this.loginLogRepository.getUsersStatistics();
    return data;
  }

  async getLoginReport(): Promise<ILoginReportDataRow[]> {
    const data = await this.loginLogRepository.getLoginReport();
    return data;
  }
}
