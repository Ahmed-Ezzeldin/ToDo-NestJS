import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsOptional()
  @IsString()
  @IsEnum(['low', 'high', 'medium'])
  priority: string;
}
