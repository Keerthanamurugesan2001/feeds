import { AbstractControl, ValidationErrors } from "@angular/forms"

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors{

  let value: string = control.value || '';

  if (!value) {
    return {}
  }

  let upperCaseCharacters = /[A-Z]+/g;
  let lowerCaseCharacters = /[a-z]+/g;
  let numberCharacters = /[0-9]+/g;

  if (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false || numberCharacters.test(value) === false) {
    return {
      passwordStrength: 'Password must contain at least two of the following: numbers, lowercase letters, uppercase letters, or special characters.'
    }

  }
  return {}
}