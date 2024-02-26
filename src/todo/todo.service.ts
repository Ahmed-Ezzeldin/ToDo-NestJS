import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateTodoDto } from './dtos/create_todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.completed = createTodoDto.completed;
    todo.priority = createTodoDto.priority;
    return this.todoRepository.save(todo);
  }

  findAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}
