import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserData => {
    const request = context.switchToHttp().getRequest();
    // AppLogger.logDivider(request);
    return request.user;
  },
);

export class UserData {
  userId: number;
  name: string;
  userType: string;
  iat: number;
  exp: number;
}
