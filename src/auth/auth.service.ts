import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from 'src/core/config/app_logger';
import { SignUpDto } from './dtos/signup.dto';
import { CreateUserDto } from 'src/modules/user/dtos/create_user.dto';
import { SignInDto } from './dtos/signin.dto';
import { ChangePasswordDto } from './dtos/change_password.dto';
import { MailService } from 'src/core/services/mail/mail.service';
import { VerifyEmailDto } from './dtos/verify_email.dto';
import { ForgetPasswordDto } from './dtos/forget_assword.dto';
import { ResetPasswordDto } from './dtos/reset_assword.dto';
import { I18nContext } from 'nestjs-i18n/dist/i18n.context';
import { RandomHelper } from 'src/core/helpers/random_helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  private get i18n(): I18nContext {
    return I18nContext.current();
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
        message: this.i18n.t('messages.Incorrect_Email_Password'),
        statusCode: 401,
      });
    }

    const isMatchPassword = await this.comparePassword(signInDto.password, user.password);
    if (!isMatchPassword) {
      throw new UnauthorizedException({
        message: this.i18n.t('messages.Incorrect_Email_Password'),
        statusCode: 401,
      });
    }

    if (!user.isActive) {
      throw new UnauthorizedException({
        message: this.i18n.t('messages.Account_Not_Active'),
        statusCode: 401,
      });
    }

    return this.signResponse(user);
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.findByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException({
        message: this.i18n.t('messages.User_Exists'),
        statusCode: 400,
      });
    }

    const otpCode = RandomHelper.generateOtpCode(6);
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
        message: this.i18n.t('messages.User_Not_Exist'),
        statusCode: 401,
      });
    }

    if (user.otpCode !== verifyEmailDto.otpCode) {
      throw new UnauthorizedException({
        message: this.i18n.t('messages.Incorrect_OTP'),

        statusCode: 401,
      });
    }
    user.otpCode = '';
    user.isActive = true;
    await this.userService.update(user.id, user);
    return {
      message: this.i18n.t('messages.Email_Verified'),
    };
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const user = await this.userService.findByEmail(forgetPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: this.i18n.t('messages.User_Not_Exist'),
        statusCode: 401,
      });
    }

    const otpCode = RandomHelper.generateOtpCode(6);
    user.otpCode = otpCode;

    await Promise.allSettled([
      this.mailService.sendResetPasswordOtp(user, otpCode),
      this.userService.update(user.id, user),
    ]);
    return {
      message: this.i18n.t('messages.Otp_Sent'),
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findByEmail(resetPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: this.i18n.t('messages.User_Not_Exist'),
        statusCode: 401,
      });
    }

    if (user.otpCode !== resetPasswordDto.otpCode) {
      throw new UnauthorizedException({
        message: this.i18n.t('messages.Incorrect_OTP'),
        statusCode: 401,
      });
    }

    const hashPassword = await this.hashPassword(resetPasswordDto.newPassword);
    user.otpCode = '';
    user.password = hashPassword;

    await this.userService.update(user.id, user);
    return {
      message: this.i18n.t('messages.Password_Reset'),
    };
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: number) {
    if (changePasswordDto.oldPassword === changePasswordDto.newPassword) {
      throw new BadRequestException({
        message: this.i18n.t('messages.New_Password_Should_Not_Equal'),
        statusCode: 400,
      });
    }
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException({
        message: this.i18n.t('messages.User_Not_Found'),
        statusCode: 400,
      });
    }

    const isMatchPassword = await this.comparePassword(changePasswordDto.oldPassword, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException({
        message: this.i18n.t('messages.Old_Password_Incorrect'),
        statusCode: 401,
      });
    }
    const hashedNewPassword = await this.hashPassword(changePasswordDto.newPassword);

    await this.userService.update(user.id, { password: hashedNewPassword });
    return {
      message: this.i18n.t('messages.Password_Changed'),
    };
  }
}
