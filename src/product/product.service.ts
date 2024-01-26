import { HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dtos/create-product.dtos';
import { UserDocument } from 'src/user/model/user.schema';
import { CategoryRepository } from 'src/category/category.repository';
import { CustomHttpException } from 'src/filters/custom-http.exception';
import { AllProductsDto } from './dtos/all-products.dto';



/**
 * User Repository
 * 
 * this class is used to do users route task
 */
@Injectable()
export class ProductService {

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) { }


  async createProduct(data: CreateProductDto, user: UserDocument) {

    const { categoryName, description, name } = data

    const category = await this.categoryRepository.findOne({ name: categoryName, isActive: true })

    if (!category) {
      throw new CustomHttpException(HttpStatus.NOT_FOUND, 'category not found')
    }

    const product = await this.productRepository.findOne({ name })

    if (product) {
      throw new CustomHttpException(HttpStatus.CONFLICT, 'product already exists')
    }

    const newProduct = await this.productRepository.create({
      name,
      description,
      categoryName,
      creator: user.id
    })

    return { newProduct }

  }



  /**
   * Asynchronous method to get online payments
   */
  async allProducts(query: AllProductsDto) {


    /**
    * extract data from query
    */
    let { limit, sort, page } = query



    // ======================= SORT =======================

    const sortObject = { ...this.sortProducts(sort) }

    const project = {
      "_id": 1,
      "name": 1,
      "description": 1,
      "categoryName": 1,
      "createdAt": 1,
    }

    /**
     * Call aggregate function to find relative users
    */
    const products = await this.productRepository.allProducts(
      sortObject,
      page,
      limit,
      project
    )

    return { products }

  }


  private sortProducts(sort: string) {

    switch (sort) {
      case "createdAt_asc":
        return { createdAt: 1 };
      case "createdAt_desc":
        return { createdAt: -1 };
      default:
        return { createdAt: 1 };
    }

  }

}
