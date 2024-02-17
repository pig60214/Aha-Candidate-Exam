import validationHelper from '../helpers/validationHelper';
import EnumResponseError from './enums/EnumResponseError';

export default interface IUpdatePasswordRequest {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export class UpdatePasswordRequest implements IUpdatePasswordRequest {
  oldPassword: string;

  password: string;

  confirmPassword: string;

  validatation: EnumResponseError;

  validateFormat() {
    if (this.password === this.oldPassword) {
      this.validatation = EnumResponseError.NewPasswordShouldBeNotSameAsOldPassword;
      return;
    }

    this.validatation = validationHelper.isValidPassword(this.password, this.confirmPassword);
  }

  constructor(request: IUpdatePasswordRequest) {
    this.oldPassword = request.oldPassword;
    this.password = request.password;
    this.confirmPassword = request.confirmPassword;
    this.validatation = EnumResponseError.Success;

    this.validateFormat();
  }
}
