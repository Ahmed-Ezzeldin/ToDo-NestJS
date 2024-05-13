import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { StrongPassword } from 'src/core/validation/strong_password_validator';

export class CheckOtpDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otpCode: string;
}
