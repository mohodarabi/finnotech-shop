import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './model/product.schema';
import { CustomHttpException } from 'src/filters/custom-http.exception';
import { IProductDocument } from './model/interface/product-document.interface';
import * as ProductModelAggPaginate from 'mongoose-aggregate-paginate-v2'

/**
 * this class is used to customize Product side queries
 */
@Injectable()
export class ProductRepository {

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Product.name) private productModeAggPaginate: ProductModelAggPaginate<ProductDocument>,
  ) { }

  /**
   * Create a new Product
   */
  async create(data: Partial<Product>): Promise<ProductDocument> {

    const Product = await this.productModel.create(data);

    if (!Product) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return Product

  }

  /**
   * Find specific Product
   */
  async findOne(data: Partial<IProductDocument>, selectOptions?: string): Promise<ProductDocument> {

    return this.productModel.findOne(data).select(selectOptions);

  }

  /**
   * Find Product by id
   */
  async findById(id: string, selectOptions?: string): Promise<ProductDocument> {

    return this.productModel.findById(id).select(selectOptions);

  }

  /**
   * Update Product data
   */
  async updateOne(id: string, data: Partial<IProductDocument>): Promise<any> {

    const updatedProduct = await this.productModel.updateOne({ _id: id }, { $set: data });

    if (updatedProduct.modifiedCount <= 0) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return updatedProduct

  }

  /**
   * Delete Product
   */
  async deleteOne(id: string): Promise<ProductDocument> {

    const Product = await this.findById(id)

    const deletedProduct = await this.productModel.deleteOne({ _id: id });

    if (deletedProduct.deletedCount) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return Product

  }

  /**
   * Get all products with correct match cases
   */
  async allProducts(sort: Object, page: number, limit: number, project: any): Promise<ProductDocument[]> {

    let products = await this.productModeAggPaginate.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryName",
          foreignField: "name",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
        },
      },
      {
        $match: {
          "category.isActive": true,
        },
      },

      {
        $sort: sort,
      },
      {
        $project: project
      },
    ]).paginateExec({
      page,
      limit
    });

    return products

  }

}