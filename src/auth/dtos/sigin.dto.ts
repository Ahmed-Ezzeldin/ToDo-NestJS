import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SiginDto {
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  password: string;
}
