import { Optional } from '@nestjs/common';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter your Name' })
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter your email' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @Optional()
  otpCode: string;
  // @IsString()
  // @IsEnum(['male', 'female', 'notSpecified'], {
  //   message: 'Please enter your gender (male, female, notSpecified)',
  // })
  // gender: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter password' })
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  password: string;
}
