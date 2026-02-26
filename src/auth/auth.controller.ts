import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signin(@Body() loginDto: LoginDto) {
    const logindata = await this.authService.signin(loginDto);

    return {
      success: true,
      user: logindata,
      message: 'user logged in succesfull',
    };
  }
}
