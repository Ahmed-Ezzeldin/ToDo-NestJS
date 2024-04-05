import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { StrongPassword } from 'src/core/validation/strong_password_validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  otpCode: string;

  @IsString()
  @Validate(StrongPassword)
  newPassword: string;
}
