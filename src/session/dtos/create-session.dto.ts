import { IsUUID, IsEnum, IsIP, IsOptional } from 'class-validator';

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  LOGGED_OUT = 'LOGGED_OUT',
  FAILED = 'FAILED',
}

export class CreateSessionDto {

  @IsUUID()
  id!: string; // user id (foreign key)

  @IsEnum(SessionStatus)
  login_status!: SessionStatus;

  @IsIP()
  ip_address!: string;

  
}