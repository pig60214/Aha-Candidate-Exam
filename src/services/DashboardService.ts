/* eslint-disable class-methods-use-this */
import { ILoginReportDataRow } from '../models/ILoginReportDataRow';
import LoginLogRepository from '../repositories/LoginLogRepository';

export default class DashboardService {
  private loginLogRepository = new LoginLogRepository();

  async getLoginReport(): Promise<ILoginReportDataRow[]> {
    const data = await this.loginLogRepository.getLoginReport();
    return data;
  }
}
