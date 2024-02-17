import validationHelper from '../helpers/validationHelper';
import IRequest from './IRequest';
import EnumResponseError from './enums/EnumResponseError';

export interface ISignUpRequest {
  /**
   * As user account, and should be unique
   */
  email: string;

  /**
   * Rules: at least one lower character, one upper character, one digit character, one special character and 8 characters
   * @example "A1@aaaaa"
   */
  password: string;

  /**
   * Should be same as password
   * @example "A1@aaaaa"
   */
  confirmPassword: string;
}

export class SignUpRequest implements ISignUpRequest, IRequest {
  email: string;

  password: string;

  confirmPassword: string;

  validatation: EnumResponseError;

  constructor(request: ISignUpRequest) {
    this.email = request.email;
    this.password = request.password;
    this.confirmPassword = request.confirmPassword;
    this.validatation = validationHelper.isValidEmail(this.email);
    if (this.validatation !== EnumResponseError.Success) {
      return;
    }
    this.validatation = validationHelper.isValidPassword(this.password, this.confirmPassword);
  }
}
