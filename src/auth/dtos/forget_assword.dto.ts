import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgetPasswordDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
}
