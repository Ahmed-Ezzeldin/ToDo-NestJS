import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PriorityEnum } from 'src/enums/priority_enum';

export class CreateTodoDto {
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  completed: boolean;

  @ApiProperty({ enum: PriorityEnum, enumName: 'Priority' })
  @IsEnum(PriorityEnum)
  priority: PriorityEnum;
}
