import EnumResponseError from './enums/EnumResponseError';

export default class ApiResponse {
  errorMessage: string;

  constructor(errorCode: EnumResponseError) {
    this.errorMessage = EnumResponseError[errorCode];
  }
}
