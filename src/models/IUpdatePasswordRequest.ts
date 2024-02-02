import validationHelper from '../helpers/validationHelper';
import EnumResponseError from './enums/EnumResponseError';

export default interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  reenterNewPassword: string;
}

export class UpdatePasswordRequest {
  oldPassword: string;

  newPassword: string;

  reenterNewPassword: string;

  validatation: EnumResponseError;

  validateFormat = () => {
    if (this.newPassword === this.oldPassword) {
      this.validatation = EnumResponseError.NewPasswordShouldBeNotSameAsOldPassword;
      return;
    }

    if (this.newPassword !== this.reenterNewPassword) {
      this.validatation = EnumResponseError.NewPasswordsShouldBeSame;
      return;
    }

    this.validatation = validationHelper.isValidPassword(this.newPassword);
  };

  constructor(request: IUpdatePasswordRequest) {
    this.oldPassword = request.oldPassword;
    this.newPassword = request.newPassword;
    this.reenterNewPassword = request.reenterNewPassword;
    this.validatation = EnumResponseError.Success;

    this.validateFormat();
  }
}
