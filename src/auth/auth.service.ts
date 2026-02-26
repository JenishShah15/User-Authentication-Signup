import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(loginDto: LoginDto) {
    const user = await this.userService.findByEmailIdWithPassword(
      loginDto.email,
    );
    if (!user) {
      throw new NotFoundException({
        status: false,
        message: 'email not registered',
      });
    } else {
      const matchpassword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (matchpassword) {
      } else {
        throw new UnauthorizedException({
          message: 'Password invalid',
          success: false,
        });
      }
    }
  }
}
