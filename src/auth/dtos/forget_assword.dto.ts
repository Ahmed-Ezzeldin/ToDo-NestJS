import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
}
