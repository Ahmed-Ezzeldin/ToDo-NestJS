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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Check if user already exists
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    // Save user
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(parseInt(id), updateUserDto);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.delete(parseInt(id));
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}
