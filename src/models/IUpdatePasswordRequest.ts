import validationHelper from '../helpers/validationHelper';
import EnumResponseError from './enums/EnumResponseError';

export default interface IUpdatePasswordRequest {
  oldPassword: string;

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
