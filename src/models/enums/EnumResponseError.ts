enum EnumResponseError {
  Success,
  UpdateFail,
  NewPasswordsShouldBeSame,
  PasswordShouldContainAtLeastOneLowerCharacter,
  PasswordShouldContainAtLeastOneUpperCharacter,
  PasswordShouldContainAtLeastOneDigitCharacter,
  PasswordShouldContainAtLeastOneSpecialCharacter,
  PasswordShouldContainAtLeast8Characters,
  NewPasswordShouldBeNotSameAsOldPassword,
}

export default EnumResponseError;
