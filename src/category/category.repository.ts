import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from './model/category.schema';
import { CustomHttpException } from 'src/filters/custom-http.exception';
import { ICategoryDocument } from './model/interface/category-document.interface';


/**
 * this class is used to customize category side queries
 */
@Injectable()
export class CategoryRepository {

  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<Category>,
  ) { }

  /**
   * Create a new category
   */
  async create(data: Partial<Category>): Promise<CategoryDocument> {

    const Category = await this.CategoryModel.create(data);

    if (!Category) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return Category

  }

  /**
   * Find specific category
   */
  async findOne(data: Partial<ICategoryDocument>, selectOptions?: string): Promise<CategoryDocument> {

    return this.CategoryModel.findOne(data).select(selectOptions);

  }

  /**
   * Find category by id
   */
  async findById(id: string, selectOptions?: string): Promise<CategoryDocument> {

    return this.CategoryModel.findById(id).select(selectOptions);

  }

  /**
   * Find categories with match cases
   */
  async find(data: Partial<ICategoryDocument>, selectOptions?: string): Promise<CategoryDocument[]> {

    return this.CategoryModel.find(data).select(selectOptions);

  }

  /**
   * Update Category data
   */
  async updateOne(id: string, data: Partial<ICategoryDocument>): Promise<any> {

    const updatedCategory = await this.CategoryModel.updateOne({ _id: id }, { $set: data });

    if (updatedCategory.modifiedCount <= 0) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return updatedCategory

  }

  /**
   * Delete Category
   */
  async deleteOne(id: string): Promise<CategoryDocument> {

    const Category = await this.findById(id)

    const deletedCategory = await this.CategoryModel.deleteOne({ _id: id });

    if (deletedCategory.deletedCount) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return Category

  }

}