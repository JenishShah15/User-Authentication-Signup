import { Inject, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dtos/create-session.dto';
import { User_Sessions } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User_Sessions)
    private readonly sessionRepository: Repository<User_Sessions>,
  ) {}

  async logSession(createsessionDto: CreateSessionDto) {
    console.log(createsessionDto);
    const data = this.sessionRepository.create({
      user: { id: createsessionDto.user },
      login_status: createsessionDto.login_status,
      login_time: createsessionDto.login_time,
      jwt_token: createsessionDto.jwt_token,
    });
    await this.sessionRepository.save(data);
    console.log(createsessionDto);
  }
}
