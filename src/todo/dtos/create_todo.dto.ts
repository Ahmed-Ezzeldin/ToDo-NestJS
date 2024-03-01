import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  @IsEnum(['low', 'high', 'medium'])
  priority: string;
}
