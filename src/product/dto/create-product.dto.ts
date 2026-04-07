import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  isString,
} from 'class-validator';

export class createproductdto {
  @IsString()
  @ApiProperty({
    example: 'Iphone Xr',
    default: 'Product Name',
    description: 'Name of the product',
  })
  name!: string;

  @IsString()

  @ApiProperty({
    example : 'randomuuid',
    default: 'User Id',
    description: 'User Id',
  })
  userId!: string;

  @IsString()
  @ApiProperty({
    example: 'Apple',
    default: 'Product Brand Name',
    description: 'Product brand name',
  })
  brandname!: string;

  @IsString()
  @ApiProperty({
    example: 'this is latest product from apple',
    default: 'Product Description',
    description: 'Product description',
  })
  description!: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: '40000',
    default: 'Product Price',
    description: 'Product price',
  })
  price!: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: '4',
    default: 'Product Rating',
    description: 'Product rating',
  })
  rating!: number;

  @IsBoolean()
  @ApiProperty({
    example: 'true',
    default: 'Product isActive',
    description: 'Product isActive',
  })
  isActive!: boolean;

  @IsString()
  @ApiProperty({
    example: 'a0e65453-2ec0-4958-b5e9-89182242b81f',
    default: 'Product Category',
    description: 'Product category',
  })
  category_id!: string;
}
