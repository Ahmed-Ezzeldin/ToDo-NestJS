import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { StrongPassword } from 'src/core/validation/strong_password_validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @Validate(StrongPassword)
  newPassword: string;
}
