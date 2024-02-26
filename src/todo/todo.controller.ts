import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create_todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAllTodos();
  }
}
