import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsString()
  @IsEnum(['low', 'high', 'medium'])
  @IsOptional()
  priority: string;
}
