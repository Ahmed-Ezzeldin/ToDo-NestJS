import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from 'src/config/app_logger';
import { SignUpDto } from './dtos/signup.dto';
import { CreateUserDto } from 'src/user/dtos/create_user.dto';
import { SignInDto } from './dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // const isCorrectPassword = await bcrypt.compare(user.password, password);
    const isCorrectPassword = password == user.password;
    if (user && isCorrectPassword) {
      return user;
    }
    return null;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);

    if (!user || user.password != signInDto.password) {
      throw new UnauthorizedException({
        message: 'Incorrect username or password!',
        statusCode: 401,
      });
    }
    AppLogger.logDivider(user);
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

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.findByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException({
        message: 'User already exists',
        statusCode: 400,
      });
    }

    var createUserDto: CreateUserDto = { ...signUpDto };

    const newUser = await this.userService.create(createUserDto);
    AppLogger.logDivider(newUser);
    const payload = {
      userId: newUser.id,
      email: newUser.email,
      userType: newUser.userType,
    };
    return {
      ...newUser,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
