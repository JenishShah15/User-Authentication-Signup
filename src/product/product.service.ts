import { HttpException, Injectable } from '@nestjs/common';
import { createproductdto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { httpClient } from 'src/common/http-client';



@Injectable()
export class ProductService {
  /**
   *
   */
  constructor(private readonly http:HttpService) {}

   
 async create(createProductDto: createproductdto) {

  try{

    const response = await httpClient.post(`/catalog/product`,createProductDto)
    console.log(response.data);
    return response.data;
  }catch(error)
  {
    console.error("Product service error",error.message);
    throw new HttpException('Product Service error',error.status)
  }
  }

  async findAll() {
    const response = await httpClient.get(`/catalog/product/all`);
    if(response)
    return {success : true,message :"Product fetched successfully",data : response.data};
  else
    return {success : false,message :"Product fetched failed"};

  }

  async findOne(id: string) {
    // return `This action returns a #${id} product`;
    const response = await httpClient.get(`/catalog/product/${id}`);
    if(response)
    return {success : true,message :"Product fetched successfully",data : response.data};
  else
    return {success : false,message :"Product fetched failed"};
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const resbodydata = {updateProductDto,id}
    const response = await httpClient.patch('/catalog/product/update',resbodydata);
    if(response)
      return {success : true,message :"Product updated successfully",data : response.data};
    else
      return {success : false,message :"Product updated failed"};
    }catch(error)
    {
      console.error("Product service error",error.message);
      throw new HttpException('Product Service error',error.status)
    }
  }

 async remove(id: string) {
    const response = await httpClient.delete(`/catalog/product/delete/${id}`);
    if(response)
      return {success : true,message :"Product deleted successfully",data : response.data};
    else
      return {success : false,message :"Product deleted failed"};
  }
}
