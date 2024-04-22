import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { RoleEnum } from 'src/auth/guard/role.enum';
import { GenderEnum } from 'src/enums/gender_enum';

export class UserDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  gender: GenderEnum;

  @ApiProperty()
  @Expose()
  userType: RoleEnum;

  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty()
  @Expose()
  otpCode: boolean;

  @ApiProperty()
  @Exclude()
  // @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  updatedAt: string;
}
