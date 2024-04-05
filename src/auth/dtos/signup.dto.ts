import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { StrongPassword } from 'src/core/validation/strong_password_validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter your Name' })
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'notSpecified'], {
    message: 'Please enter your gender (male, female, notSpecified)',
  })
  gender: string;

  @IsString()
  @Validate(StrongPassword)
  password: string;
}
