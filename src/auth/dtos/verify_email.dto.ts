import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  otpCode: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
}
