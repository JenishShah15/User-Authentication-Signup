import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jenish Shah',
    description: 'Name of the user',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 25,
    description: 'Age of the user',
    default: 18,
  })
  @IsInt()
  @Min(1)
  age!: number;
  @ApiProperty({
    example: 'India',
    description: 'Country of the user',
  })
  @IsString()
  @MaxLength(50)
  country!: string;

  @ApiProperty({
    example: '9999999999',
    description: 'Phone number of the user',
  })
  @IsString()
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Phone must contain only digits (10-15)',
  })
  phone!: string;

  @ApiProperty({
    example: 'jenish@gmail.com',
    description: 'Email of the user',
    default: 'jenish@gmail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Jenish1@12',
    description: 'Name of the user',
    default: 'Jenish1@12',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password!: string;
}
