import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsOptional()
  email: string;

  @IsString()
  @IsEnum(['male', 'female'], { message: 'Please enter your gender' })
  @IsOptional()
  gender: string;
}
