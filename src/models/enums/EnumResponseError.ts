enum EnumResponseError {
  Success,
  NewPasswordsShouldBeSame,
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
}

export default EnumResponseError;
