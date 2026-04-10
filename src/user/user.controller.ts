import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isPublic } from 'src/common/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/roles.decorator';
import { STATUS_CODES } from 'http';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @isPublic()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const userWithoutPassword = { ...user, password: '*******' };

    return {
      success: true,
      STATUS_CODES: 201,
      message: 'User created Successfully',
      data: userWithoutPassword,
    };
  }

  @Get()
  @ApiBearerAuth('access-token')
  @Roles('admin')
  @HttpCode(202)
  async findAll() {
    const users = await this.userService.findAll();
    if (users.length != 0) {
      return {
        success: true,
        STATUS_CODES: 200,
        message: 'Users retrieved successfully',
        data: users,
      };
    } else {
      return {
        success: false,
        STATUS_CODES: 404,
        message: 'no users found',
        data: [],
      };
    }
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log('enterring find one controller');
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  async update(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userIdFromToken = (req.user as any)?.sub;
    if (userIdFromToken !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @Roles('admin')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
