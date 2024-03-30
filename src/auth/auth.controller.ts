import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { ChangePasswordDto } from './dtos/change_password.dto';
import { GetUser, UserData } from './get_user.decorator';
import { RolesGuard } from './role/roles.guard';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(AuthGuard)
  @Post('changePassword')
  async changePassword(@Body() body: ChangePasswordDto, @GetUser() user: UserData) {
    return this.authService.changePassword(body, user.userId);
  }
}
