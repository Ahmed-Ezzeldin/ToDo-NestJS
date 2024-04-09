import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otpCode: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
}
