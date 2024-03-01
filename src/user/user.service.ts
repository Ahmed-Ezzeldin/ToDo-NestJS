import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    return user;
  }

  async findByEmail(email: string) {
    const users = await this.userRepo.find({ where: { email: email } });
    return users;
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async update(id: number, partialUser: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }
    Object.assign(user, partialUser);
    return this.userRepo.save(user);
  }

  async delete(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }
    return this.userRepo.delete(user);
  }
}
