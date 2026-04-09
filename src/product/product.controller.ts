import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createproductdto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/roles.decorator';

@ApiBearerAuth('access-token')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  @Roles('admin')
  @ApiBearerAuth('access-token')
  create(@Body() createProductDto: createproductdto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  // @ApiBearerAuth('access-token')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  // @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id); 
  }

  @Patch(':id')
  @Roles('admin')
  @ApiBearerAuth('access-token')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':productId')
  @Roles('admin')
  @ApiBearerAuth('access-token')
  remove(@Param('productId') id: string) {
    return this.productService.remove(id);
  }
}
