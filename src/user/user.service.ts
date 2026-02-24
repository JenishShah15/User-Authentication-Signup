import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    const createdUser = await this.userRepository.save(user);
    return { details: createdUser, message: 'User created successfully' };
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: string) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const retrievedUser = await this.userRepository.findOneBy({ id });
    if (!retrievedUser) {
      return null;
    }
    const updatedUser = Object.assign(retrievedUser, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      await this.userRepository.remove(user);
      return { message: 'User deleted successfully', userId: id };
    }
  }
}
