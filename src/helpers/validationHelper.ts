import EnumResponseError from '../models/enums/EnumResponseError';

const validationHelper = {
  isValidPassword(password: string, confirmPassword: string): EnumResponseError {
    if (password !== confirmPassword) {
      return EnumResponseError.PasswordAndConfirmPasswordShouldBeSame;
    }

    if (!/[a-z]/.test(password)) {
      return EnumResponseError.PasswordShouldContainAtLeastOneLowerCharacter;
    }

    if (!/[A-Z]/.test(password)) {
      return EnumResponseError.PasswordShouldContainAtLeastOneUpperCharacter;
    }

    if (!/[0-9]/.test(password)) {
      return EnumResponseError.PasswordShouldContainAtLeastOneDigitCharacter;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return EnumResponseError.PasswordShouldContainAtLeastOneSpecialCharacter;
    }

    if (password.length < 8) {
      return EnumResponseError.PasswordShouldContainAtLeast8Characters;
    }

    return EnumResponseError.Success;
  },
  isValidEmail(email: string): EnumResponseError {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return EnumResponseError.EmailFormatWrong;
    }
    return EnumResponseError.Success;
  },
};

export default validationHelper;
