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
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAllTodos() {
    return this.todoService.findAll();
  }

  @Get('/:id')
  async findTodo(@Param('id') id: string) {
    const todo = await this.todoService.findOne(parseInt(id));
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
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
