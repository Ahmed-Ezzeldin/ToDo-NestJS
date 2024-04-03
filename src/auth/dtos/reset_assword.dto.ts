import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  otpCode: string;

  @IsString()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  newPassword: string;
}
