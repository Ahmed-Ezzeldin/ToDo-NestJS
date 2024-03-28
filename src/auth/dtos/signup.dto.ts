import { Optional } from '@nestjs/common';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter your Name' })
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  password: string;
}
