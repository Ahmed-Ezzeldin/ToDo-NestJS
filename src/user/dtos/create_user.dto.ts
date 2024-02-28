import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter your email' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsEnum(['male', 'female'], { message: 'Please enter your gender' })
  gender: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter password' })
  password: string;
}
