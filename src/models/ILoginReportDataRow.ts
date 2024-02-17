export interface ILoginReportDataRow {
  /**
   * User email
   */
  email: string;
  /**
   * Sign up datetime
   */
  signUp: string;
  /**
   * Total login times
   */
  loginTimes: number;
  /**
   * Last session datetime
   */
  lastSession: string;
}
