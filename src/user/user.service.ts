import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const user = this.userRepository.create(createUserDto);
      const createdUser = await this.userRepository.save(user);

      return createdUser;
    } catch (error: any) {
      console.log('error printing');
      console.log(error.detail);
      console.log('error printing ended');
      throw new BadRequestException({
        success: false,
        message: 'Failed to create user',
        error: error.detail,
      });
    }
  }

  findAll() {
    return this.userRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected == 0) {
      throw new NotFoundException('User not found');
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }
}
