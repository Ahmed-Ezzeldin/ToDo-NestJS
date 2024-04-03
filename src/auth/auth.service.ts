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
import { VerifyEmailDto } from './dtos/verify_email.dto';
import { join } from 'path';
import { ForgetPasswordDto } from './dtos/forget_assword.dto';
import { ResetPasswordDto } from './dtos/reset_assword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  generateOtp(length: number): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

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

    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password',
        statusCode: 401,
      });
    }

    const isMatchPassword = await this.comparePassword(signInDto.password, user.password);
    if (!isMatchPassword) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password',
        statusCode: 401,
      });
    }

    if (!user.isActive) {
      throw new UnauthorizedException({
        message: 'Your account is not active',
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

    const otpCode = this.generateOtp(6);
    const hashPassword = await this.hashPassword(signUpDto.password);
    var createUserDto: CreateUserDto = {
      ...signUpDto,
      otpCode: otpCode,
    };
    createUserDto.password = hashPassword;
    const newUser = await this.userService.create(createUserDto);
    await this.mailService.sendVerifyingEmail(newUser, otpCode);
    return this.signResponse(newUser);
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const user = await this.userService.findByEmail(verifyEmailDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'User does not exist',
        statusCode: 401,
      });
    }

    if (user.otpCode !== verifyEmailDto.otpCode) {
      throw new UnauthorizedException({
        message: 'Otp code is incorrect',
        statusCode: 401,
      });
    }
    user.otpCode = '';
    user.isActive = true;
    await this.userService.update(user.id, user);
    return {
      message: 'Email verified successfully',
    };
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const user = await this.userService.findByEmail(forgetPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'User does not exist',
        statusCode: 401,
      });
    }

    const otpCode = this.generateOtp(6);
    user.otpCode = otpCode;

    await Promise.all([this.mailService.sendResetPasswordOtp(user, otpCode), this.userService.update(user.id, user)]);
    return {
      message: 'Otp Code sent to your email',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findByEmail(resetPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'User does not exist',
        statusCode: 401,
      });
    }

    if (user.otpCode !== resetPasswordDto.otpCode) {
      throw new UnauthorizedException({
        message: 'Otp code is incorrect',
        statusCode: 401,
      });
    }

    const hashPassword = await this.hashPassword(resetPasswordDto.newPassword);
    user.otpCode = '';
    user.password = hashPassword;

    await this.userService.update(user.id, user);
    return {
      message: 'Password reset successfully',
    };
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
