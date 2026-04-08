import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '../common/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { isPublic } from '../common/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @isPublic()
  async signin(@Body() loginDto: LoginDto) {
    const logindata = await this.authService.signin(loginDto);

    return {
      success: true,
      user: logindata,
      message: 'user logged in succesfull',
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  getProfile(@Request() req: any) {
    console.log(req);
    return this.authService.getProfile(req.user);
  }
}
