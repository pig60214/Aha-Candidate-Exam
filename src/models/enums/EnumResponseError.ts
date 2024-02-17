enum EnumResponseError {
  Success,
  PasswordAndConfirmPasswordShouldBeSame,
  PasswordShouldContainAtLeastOneLowerCharacter,
  PasswordShouldContainAtLeastOneUpperCharacter,
  PasswordShouldContainAtLeastOneDigitCharacter,
  PasswordShouldContainAtLeastOneSpecialCharacter,
  PasswordShouldContainAtLeast8Characters,
  NewPasswordShouldBeNotSameAsOldPassword,
  EmailExists,
  InternalError,
  PleaseLoginFirst,
  EmailFormatWrong,
  PleaseSignUpFirst,
  WrongPassword,
  OldPasswordIsWrong,
  PleaseLoginWithGoogle,
  PleaseVerifyEmailFirst,
}

export default EnumResponseError;
