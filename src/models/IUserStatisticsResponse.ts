export interface IUserStatisticsResponse {
  /**
   * Number of users. Include users hasn't passed email verification.
   */
  signedUpUserNumber: number;
  /**
   * Active session number from 00:00:00 today.
   */
  toadyActiveSessionUserNumber: number;
  /**
   * Active session number from 00:00:00 7 days ago.
   */
  weekActiveSessionUserAverageNumber: number;
}
