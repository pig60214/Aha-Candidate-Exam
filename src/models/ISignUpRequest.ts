import validationHelper from '../helpers/validationHelper';
import IRequest from './IRequest';
import EnumResponseError from './enums/EnumResponseError';

export interface ISignUpRequest {
  email: string;
  password: string;
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
