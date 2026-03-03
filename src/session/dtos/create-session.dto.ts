import { IsUUID, IsEnum, IsIP, IsOptional, IsString } from 'class-validator';

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  LOGGED_OUT = 'LOGGED_OUT',
  FAILED = 'FAILED',
}

export class CreateSessionDto {
  @IsUUID()
  user!: string; // user id (foreign key)

  @IsEnum(SessionStatus)
  login_status!: SessionStatus;

  
  login_time!: Date;

  
  @IsOptional()
  jwt_token?: string;
}
