// custom-validator.ts
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class StrongPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    /*  
    Password should be:-
        - at least 8 characters long and contain 
        - at least one uppercase letter, 
        - at least one lowercase letter, 
        - at least one number, 
        - at least one special character
    */
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    return strongRegex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must have atleast 8 characters long and contain uppercase, lowercase, number, and special character.';
  }
}
