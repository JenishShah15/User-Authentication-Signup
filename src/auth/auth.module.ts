import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [
    UserModule,
    SessionModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
         
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
