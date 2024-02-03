export default class ApiResponse {
  message: string;

  constructor(errorMessage?: string) {
    this.message = errorMessage ?? 'Success';
  }
}
