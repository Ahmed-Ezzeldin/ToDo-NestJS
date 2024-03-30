import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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

  async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const hashedPassword = bcrypt.hash(password, saltRound);
    return hashedPassword;
  }

  async comparePassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
  }

  async signResponse(user: User) {
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

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);
    const hashPassword = await this.hashPassword(signInDto.password);
    const isCorrectPassword = await this.comparePassword(signInDto.password, user.password);
    AppLogger.log(hashPassword);

    if (!user || !isCorrectPassword) {
      throw new UnauthorizedException({
        message: 'Incorrect username or password!',
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
}
