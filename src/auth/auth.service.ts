import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

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
    console.log(user);
    console.log(process.env.JWT_SECRET);

    if (user.password != password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      ...user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
