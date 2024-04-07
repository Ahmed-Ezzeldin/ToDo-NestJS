import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { Serialize } from 'src/core/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { I18nContext } from 'nestjs-i18n/dist/i18n.context';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  private get i18n(): I18nContext {
    return I18nContext.current();
  }

  @Get()
  findUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException(this.i18n.t('messages.User_Not_Found', { args: { userId: id } }));
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Check if user already exists
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException(this.i18n.t('messages.Email_Exists'));
    }

    // Save user
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(parseInt(id), updateUserDto);
    if (!user) {
      throw new NotFoundException(this.i18n.t('messages.User_Not_Found', { args: { userId: id } }));
    }
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.delete(parseInt(id));
    if (!user) {
      throw new NotFoundException(this.i18n.t('messages.User_Not_Found', { args: { userId: id } }));
    }
    return { message: this.i18n.t('messages.User_Deleted') };
  }
}
