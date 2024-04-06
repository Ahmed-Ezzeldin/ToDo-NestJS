import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create_todo.dto';
import { UpdateTodoDto } from './dtos/update_todo.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/guard/role.decorator';
import { Role } from 'src/auth/guard/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { GetUser, UserData } from 'src/auth/guard/get_user.decorator';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAllTodos() {
    // AppLogger.logDivider(process.env.JWT_SECRET_KEY);
    return this.todoService.findAll();
  }

  @UseGuards(RolesGuard)
  @Get('/user')
  async findAllTodosByUser(@GetUser() user: UserData) {
    return this.todoService.findAllTodosByUser(user.userId);
  }

  @Get('/:id')
  async findTodo(@Param('id') id: string) {
    const todo = await this.todoService.findOne(parseInt(id));
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  @UseGuards(RolesGuard)
  @Post()
  async create(
    @GetUser() user: UserData,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    createTodoDto.userId = user.userId;
    return this.todoService.create(createTodoDto);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoService.update(parseInt(id), updateTodoDto);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const todo = await this.todoService.delete(parseInt(id));
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return { message: 'Todo deleted successfully' };
  }
}
