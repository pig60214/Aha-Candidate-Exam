import validationHelper from '../helpers/validationHelper';
import IRequest from './IRequest';
import EnumResponseError from './enums/EnumResponseError';

export interface ISignUpRequest {
  email: string;
  password: string;
}

export class SignUpRequest implements ISignUpRequest, IRequest {
  email: string;

  password: string;

  validatation: EnumResponseError;

  constructor(request: ISignUpRequest) {
    this.email = request.email;
    this.password = request.password;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.validatation = EnumResponseError.EmailFormatWrong;
      return;
    }
    this.validatation = validationHelper.isValidPassword(this.password);
  }
}
