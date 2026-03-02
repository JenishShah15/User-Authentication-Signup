import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService : SessionService,
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
        console.log(loginDto);
        const payload = { sub: user.id, username: user.name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException({
          message: 'Password invalid',
          success: false,
        });
      }
    }
  }

  async getProfile(user: any) {
    let email = "";
    let { sub } = user;
    let profiledata = await this.userService.findOne(email,sub);
    return profiledata;
  }
}
