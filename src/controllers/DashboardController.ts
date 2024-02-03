/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import {
  Controller,
  Get,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ILoginReportDataRow } from '../models/ILoginReportDataRow';
import DashboardService from '../services/DashboardService';

@Route('dashboard')
@Tags('Dashboard')
@Security('BearerAuth')
export class DashboardController extends Controller {
  private dashboardService = new DashboardService();

  @Get('/get-login-report')
  public async getLoginReport(): Promise<ILoginReportDataRow[]> {
    const data = await this.dashboardService.getLoginReport();
    return data;
  }
}