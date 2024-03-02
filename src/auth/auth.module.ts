import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Todo } from 'src/entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET,
      secret: 'JwtSecret1234',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
})
export class AuthModule {}
