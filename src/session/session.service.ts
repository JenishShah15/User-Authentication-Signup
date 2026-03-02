import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  async logSession() {
    return 'the session has been logged';
  }
}
