import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Res, Body, Post, Req, Get, Query } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductResponse, GetProductResponse } from './docs/success-product.response';
import { BadRequestError, ForbiddenError, InternalServerError, UnAuthorizedError, UnprocessableEntityError } from 'src/docs/errors.response';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
import { Response } from 'express';
import { CreateProductDto } from './dtos/create-product.dtos';
import { AllProductsPipe } from './pipe/all-products-history.pipe';
import { AllProductsDto } from './dtos/all-products.dto';

/**
 * Swagger tag for categories this controller
 */
@ApiTags('Product')
/**
 * for serialization response  
 */
@UseInterceptors(ClassSerializerInterceptor)
/**
 * check is user valid or not to access this controller
*/
@UseGuards(AuthGuard)
/**
 * Product Controller
 * 
 * this class is used to redirect user routes to specific services
 * 
 * all routes that start with 'api/v1/product' enter into this controller
 */
@Controller('api/v1/product')
export class ProductController {

  constructor(
    private readonly productService: ProductService
  ) { }


  // ============= CREATE_PRODUCT =============

  /**
   * create product
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'create product' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: CreateProductResponse
  })
  @ApiResponse({
    status: 422,
    description: 'validation error',
    type: UnprocessableEntityError
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: UnAuthorizedError
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: InternalServerError
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: BadRequestError
  })
  @Post('create')
  async createProduct(@Body() body: CreateProductDto, @Req() req: RequestWithUser, @Res() res: Response) {

    const { user } = req
    const data = await this.productService.createProduct(body, user)

    res.status(200).json({
      status: 200,
      success: true,
      message: 'product successfully created',
    })

  }



  // ============= GET ALL PRODUCTS =============

  /**
   * get all products
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'get all products' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: GetProductResponse
  })
  @ApiResponse({
    status: 422,
    description: 'validation error',
    type: UnprocessableEntityError
  })
  @ApiResponse({
    status: 403,
    description: 'forbidden',
    type: ForbiddenError
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: InternalServerError
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: BadRequestError
  })
  @Get('products')
  async getAllProducts(@Query(AllProductsPipe) query: AllProductsDto, @Req() req: RequestWithUser, @Res() res: Response) {

    const data = await this.productService.allProducts(query)
    const { products } = data

    res.status(200).json({
      status: 200,
      success: true,
      message: 'products successfully taken',
      data: products
    })

  }


}
