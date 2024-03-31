import { JwtModuleOptions } from '@nestjs/jwt';
import { AppConst } from './app_const';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  // secret: process.env.JWT_SECRET_KEY,
  secret: AppConst.jwtSecretKey,
  signOptions: {
    expiresIn: '3600s',
  },
};
