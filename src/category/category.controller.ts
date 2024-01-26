import { Controller, UseGuards, UseInterceptors, ClassSerializerInterceptor, Req, Res, Post, Body, Get } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { BadRequestError, InternalServerError, UnAuthorizedError, UnprocessableEntityError } from 'src/docs/errors.response';
import { Response } from 'express';
import { RequestWithUser } from 'src/auth/interface/request-with-user.interface';
import { CreateCategoryDto } from './dtos/create-category.dtos';
import { CreateCategoryResponse, GetCategoriesResponse } from './docs/success-category.response';

/**
 * Swagger tag for categories this controller
 */
@ApiTags('Category')
/**
 * for serialization response  
 */
@UseInterceptors(ClassSerializerInterceptor)
/**
 * check is user valid or not to access this controller
*/
@UseGuards(AuthGuard)
/**
 * Category Controller
 * 
 * this class is used to redirect user routes to specific services
 * 
 * all routes that start with 'api/v1/category' enter into this controller
 */
@Controller('api/v1/category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) { }


  // ============= CREATE_CATEGORY =============

  /**
   * create category
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'create category' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: CreateCategoryResponse
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
  async createCategory(@Body() body: CreateCategoryDto, @Req() req: RequestWithUser, @Res() res: Response) {

    const data = await this.categoryService.createCategory(body)

    res.status(200).json({
      status: 200,
      success: true,
      message: 'category successfully created',
    })

  }


  // ============= GET_CATEGORIES =============

  /**
   * get all categories
  */
  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiOperation({ summary: 'get all categories' })
  @ApiResponse({
    status: 200,
    description: 'success response',
    type: GetCategoriesResponse
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
  @Get('all')
  async allCategories(@Req() req: RequestWithUser, @Res() res: Response) {

    const data = await this.categoryService.allCategories()
    const { categories } = data

    res.status(200).json({
      status: 200,
      success: true,
      message: 'categories successfully taken',
      data: categories
    })

  }



}
