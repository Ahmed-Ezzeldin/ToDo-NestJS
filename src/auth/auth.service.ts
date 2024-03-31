import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from 'src/config/app_logger';
import { SignUpDto } from './dtos/signup.dto';
import { CreateUserDto } from 'src/user/dtos/create_user.dto';
import { SignInDto } from './dtos/signin.dto';
import { ChangePasswordDto } from './dtos/change_password.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  }

  async comparePassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
  }

  async signResponse(user: User) {
    AppLogger.log(user);
    const payload = {
      userId: user.id,
      email: user.email,
      userType: user.userType,
    };
    return {
      ...user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);
    const isMatchPassword = await this.comparePassword(signInDto.password, user.password);

    if (!user || !isMatchPassword) {
      throw new UnauthorizedException({
        message: 'Incorrect username or password',
        statusCode: 401,
      });
    }

    return this.signResponse(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.findByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException({
        message: 'User already exists',
        statusCode: 400,
      });
    }
    const hashPassword = await this.hashPassword(signUpDto.password);
    var createUserDto: CreateUserDto = { ...signUpDto };
    createUserDto.password = hashPassword;
    const newUser = await this.userService.create(createUserDto);
    return this.signResponse(newUser);
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: number) {
    if (changePasswordDto.oldPassword === changePasswordDto.newPassword) {
      throw new BadRequestException({
        message: 'New password should not be equal to old password',
        statusCode: 400,
      });
    }
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException({
        message: 'User not found',
        statusCode: 400,
      });
    }

    const isMatchPassword = await this.comparePassword(changePasswordDto.oldPassword, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException({
        message: 'Old password is incorrect',
        statusCode: 401,
      });
    }
    const hashedNewPassword = await this.hashPassword(changePasswordDto.newPassword);

    await this.userService.update(user.id, { password: hashedNewPassword });
    return {
      message: 'Password changed successfully',
    };
  }
}
