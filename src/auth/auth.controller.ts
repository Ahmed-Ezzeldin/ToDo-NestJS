import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SiginDto } from './dtos/sigin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() body: SiginDto) {
    return this.authService.signin(body.email, body.password);
  }
}
