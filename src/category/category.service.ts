import { HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dtos/create-category.dtos';
import { CustomHttpException } from 'src/filters/custom-http.exception';


@Injectable()
export class CategoryService {

  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) { }


  /**
   * Handle create category
   */
  async createCategory(data: CreateCategoryDto) {

    const { name, description } = data

    const category = await this.categoryRepository.findOne({ name })

    if (category) {
      throw new CustomHttpException(HttpStatus.CONFLICT, 'category already exists')
    }

    const newCategory = await this.categoryRepository.create({
      name,
      description
    })

    return { newCategory }

  }


  /**
   * Handle get all categories
   */
  async allCategories() {

    const categories = await this.categoryRepository.find({}, 'name')

    return { categories }

  }

}
