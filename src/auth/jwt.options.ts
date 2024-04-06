import { JwtModuleOptions } from '@nestjs/jwt';
import { AppConst } from '../core/config/app_const';

export const jwtOptions: JwtModuleOptions = {
  global: true,
  // secret: process.env.JWT_SECRET_KEY,
  secret: AppConst.jwtSecretKey,
  signOptions: {
    expiresIn: '3600s',
  },
};
