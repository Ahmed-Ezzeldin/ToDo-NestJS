import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter your Name' })
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter your email' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsEnum(['male', 'female'], {
    message: 'Please enter your gender (male, female)',
  })
  gender: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter password' })
  password: string;
}
