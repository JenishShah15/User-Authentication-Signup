import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'jenish@gmail.com',
    description: 'Email of the user',
    default: '',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Jenish1@12',
    description: 'Password of the user',
    default: '',
  })
  @IsString()
  password!: string;
}
