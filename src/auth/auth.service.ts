import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from 'src/config/app_logger';

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

  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user || user.password != password) {
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
}
