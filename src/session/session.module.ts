import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Sessions } from './entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User_Sessions]),  // 🔥 REQUIRED
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
