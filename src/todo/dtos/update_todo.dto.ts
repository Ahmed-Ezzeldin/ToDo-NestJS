import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(['low', 'high', 'medium'])
  priority: string;
}
