import { HttpException, Injectable, ServiceUnavailableException, GatewayTimeoutException } from '@nestjs/common';
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
    try {
      const response = await httpClient.get(`/catalog/product/all`);
      if (response) {
        return { statusCode: 200, success: true, message: "Product fetched successfully", data: response.data };
      } else {
        return { statusCode: 404, success: false, message: "Product fetched failed" };
      }
    } catch (error) {
      console.log("Product service findAll ", error.message);
      if(error.message?.length==0)
      throw new ServiceUnavailableException({message : "Product Service unavailable",success : false,statusCode : 503,error : "server is down"});
    else
     return{message : "Product Service unavailable",success : false,statusCode :503,error : error.message};
    }
  }

  async findOne(id: string) {
    try {
      // return `This action returns a #${id} product`;
      const response = await httpClient.get(`/catalog/product/${id}`);
      if (response) {
        return { statusCode: 200, success: true, message: "Product fetched successfully", data: response.data };
      } else {
        return { statusCode: 404, success: false, message: "Product fetched failed" };
      }
    } catch (error) {
      console.error("Product service findOne error", error.message);
      throw new ServiceUnavailableException('Product Service unavailable', error?.status ?? 503);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const resbodydata = {updateProductDto,id}
    const response = await httpClient.patch('/catalog/product/update',resbodydata);
    if(response)
      return {statusCode : 200,success : true,message :"Product updated successfully",data : response.data};
    else
      return {statusCode : 404,success : false,message :"Product updated failed resource not found"};
    }catch(error)
    {
      console.error("Product service error",error.message);
     return{success:false,statusCode:error.status,message :"Product Service error"}
    }
  }

 async remove(id: string) {
    const response = await httpClient.delete(`/catalog/product/delete/${id}`);
    if(response)
      return {statusCode : 200,success : true,message :"Product deleted successfully",data : response.data};
    else
      return {statusCode : 404,success : false,message :"Product deleted failed resource not found"};
  }
}
