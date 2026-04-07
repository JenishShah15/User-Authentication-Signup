import { PartialType } from '@nestjs/swagger';
import { createproductdto } from './create-product.dto';

export class UpdateProductDto extends PartialType(createproductdto) {}
