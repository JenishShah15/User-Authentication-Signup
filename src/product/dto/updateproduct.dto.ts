import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  isString,
} from 'class-validator';

export class updateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'a0e65453-2ec0-4958-b5e9-89182242b81f',
    default: 'Product Id',
    description: 'Product Id',
  })
  id!: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Iphone Xr',
    default: 'Product Name',
    description: 'Name of the product',
  })
  name!: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'this is latest product from apple',
    default: 'Product Description',
    description: 'Product description',
  })
  description!: string;
  @IsNumber()
  @IsOptional()
  @Min(1)
  @ApiProperty({
    example: '40000',
    default: 'Product Price',
    description: 'Product price',
  })
  price!: number;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: 'true',
    default: 'Product isActive',
    description: 'Product isActive',
  })
  isActive!: boolean;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'a0e65453-2ec0-4958-b5e9-89182242b81f',
    default: 'Product Category',
    description: 'Product category',
  })
  category_id!: string;
}
