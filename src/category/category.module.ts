import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './model/category.schema';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UserModule } from 'src/user/user.module';


@Module({

  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    UserModule
  ],

  controllers: [
    CategoryController
  ],

  providers: [
    CategoryRepository,
    CategoryService
  ],

  exports: [
    CategoryRepository
  ],

})

export class CategoryModule { }
