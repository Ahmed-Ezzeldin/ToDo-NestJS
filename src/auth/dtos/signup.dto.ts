import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, Validate } from 'class-validator';
import { StrongPassword } from 'src/core/validation/strong_password_validator';
import { GenderEnum } from 'src/enums/gender_enum';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Please enter your Name' })
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @ApiProperty({ enum: GenderEnum, enumName: 'Gender' })
  @IsOptional()
  @IsEnum(GenderEnum, {
    message: 'Please enter your gender (male, female, notSpecified)',
  })
  gender: GenderEnum;

  @ApiProperty()
  @IsString()
  @Validate(StrongPassword)
  // @IsStrongPassword({
  //   minLength: 8,
  //   minLowercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  //   minUppercase: 1,
  // })
  password: string;
}
