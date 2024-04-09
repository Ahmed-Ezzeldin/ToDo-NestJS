import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true
  })
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @ApiProperty({
    example: 'Rehmat@12345',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
