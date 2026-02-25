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
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsInt()
  @Min(1)
  age!: number;

  @IsString()
  @MaxLength(50)
  country!: string;

  @IsString()
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Phone must contain only digits (10-15)',
  })
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password!: string;
}
