import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  gender: string;

  @Expose()
  userType: string;

  @Exclude()
  password: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
