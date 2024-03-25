import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsOptional()
  @IsString()
  @IsEnum(['male', 'female', 'notSpecified'], {
    message: 'Please enter your gender (male, female, notSpecified)',
  })
  gender: string;
}
