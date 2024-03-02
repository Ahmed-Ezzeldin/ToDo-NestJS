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
    console.log('================================');
    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password != password) {
      throw new UnauthorizedException();
    }

    console.log('================================ ' + user.email);
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      ...user,
      accessToken: 'SADSADASDSADSADASDSADSADASDSADSADASDSADSADASDSADSADASD',
      //   accessToken: this.jwtService.sign(payload),
    };
  }
}
