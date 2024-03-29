import EnumHttpStatus from './enums/EnumHttpStatus';
import EnumResponseError from './enums/EnumResponseError';

const MAPPING: Record<number, EnumHttpStatus> = {
  [EnumResponseError.Success]: EnumHttpStatus.Success,
  [EnumResponseError.PasswordAndConfirmPasswordShouldBeSame]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.PasswordShouldContainAtLeastOneLowerCharacter]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.PasswordShouldContainAtLeastOneUpperCharacter]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.PasswordShouldContainAtLeastOneDigitCharacter]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.PasswordShouldContainAtLeastOneSpecialCharacter]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.PasswordShouldContainAtLeast8Characters]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.NewPasswordShouldBeNotSameAsOldPassword]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.EmailExists]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.PleaseLoginFirst]: EnumHttpStatus.Unauthorized,
  [EnumResponseError.EmailFormatWrong]: EnumHttpStatus.ValidationFailed,
  [EnumResponseError.PleaseSignUpFirst]: EnumHttpStatus.Unauthorized,
  [EnumResponseError.WrongPassword]: EnumHttpStatus.Unauthorized,
  [EnumResponseError.OldPasswordIsWrong]: EnumHttpStatus.Unauthorized,
  [EnumResponseError.PleaseLoginWithGoogle]: EnumHttpStatus.Unauthorized,
  [EnumResponseError.PleaseVerifyEmailFirst]: EnumHttpStatus.Unauthorized,
};

export default class ApiResponseError extends Error {
  httpStatus: EnumHttpStatus;

  constructor(errorCode: EnumResponseError) {
    super(EnumResponseError[errorCode]);
    this.message = EnumResponseError[errorCode];
    if (MAPPING[Number(errorCode)]) {
      this.httpStatus = MAPPING[Number(errorCode)];
    } else {
      this.httpStatus = EnumHttpStatus.InternalError;
    }
  }
}
