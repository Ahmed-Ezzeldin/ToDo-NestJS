import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AppConst } from 'src/config/app_const';
import { MailModule } from 'src/mail/mail.module';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register(jwtConfig),
    MailModule,
  ],
})
export class AuthModule {}
