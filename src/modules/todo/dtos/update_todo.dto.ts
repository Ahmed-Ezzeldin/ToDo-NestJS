import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority } from 'src/enums/priority_enum';

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

  @ApiProperty({ enum: Priority, enumName: 'Priority', required: false })
  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
