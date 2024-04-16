import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // @IsEmail({}, { message: 'Please enter a valid email address' })
  // email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['male', 'female', 'notSpecified'], {
    message: 'Please enter your gender (male, female, notSpecified)',
  })
  gender: string;
}
