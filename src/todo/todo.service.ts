import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateTodoDto } from './dtos/create_todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async findAll() {
    return this.todoRepo.find();
  }

  async findOne(id: number) {
    const todo = await this.todoRepo.findOne({ where: { id: id } });
    if (!todo) {
      return null;
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepo.create(createTodoDto);
    return this.todoRepo.save(todo);
  }

  async update(id: number, attrs: Partial<Todo>) {
    const todo = await this.todoRepo.findOne({ where: { id: id } });
    if (!todo) {
      return null;
    }
    Object.assign(todo, attrs);
    return this.todoRepo.save(todo);
  }

  async delete(id: number) {
    const todo = await this.todoRepo.findOne({ where: { id: id } });
    if (!todo) {
      return null;
    }
    return this.todoRepo.delete(todo);
  }
}
