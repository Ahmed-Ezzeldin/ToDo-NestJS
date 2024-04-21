import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { GenderEnum } from 'src/enums/gender_enum';

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

  @ApiProperty({ enum: GenderEnum, enumName: 'Gender' })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender: GenderEnum;
}
