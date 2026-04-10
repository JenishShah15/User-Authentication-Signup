import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { STATUS_CODES } from 'http';

export interface UpdateUserResponse {
  data: User;
  message: string;
  STATUS_CODES: number;
  success: boolean;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      console.log(await bcrypt.compare('Jenish1@12', hashedPassword));
      const createdUser = await this.userRepository.save(user);

      return createdUser;
    } catch (error: any) {
      console.log('error printing');
      console.log(error.detail);
      console.log('error printing ended');
      if(error.detail?.includes('email')){
        throw new ConflictException({
          STATUS_CODES : 409,
          success: false,
          message: 'Failed to create user. Acount already existed with email',
          error: error.detail,
        })
      }
      if(error.detail?.includes('phone')){
        throw new ConflictException({
          STATUS_CODES : 409,
          success: false,
          message: 'Failed to create user. Acount already existed with phone no.',
          error: error.detail,
        })
      }
      throw new ConflictException({
        STATUS_CODES : 409,
        success: false,
        message: 'Failed to create user. Acount already existed with email or phone no.',
        error: error.detail,

      });
    }
  }

  findAll() {
    return this.userRepository.find({ order: { created_at: 'DESC' } });
  }

  async findByEmailIdWithPassword(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findOne(sub?: string) {
    var user;
    if (sub) {
      user = await this.userRepository.findOneBy({ id: sub });
      return user;
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected == 0) {
      throw new NotFoundException('Resource not found , resource Id is invalid');
    }
    const user = await this.findOne(id);
    return {data : user, message : 'User updated successfully',STATUS_CODES : 200,success : true,};
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException('Resource not found,Resource id is invalid');
    }
    return { message: 'User deleted successfully',STATUS_CODES : 200,success : true };
  }
}
