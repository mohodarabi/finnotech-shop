import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './model/product.schema';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';


@Module({

  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
    UserModule,
    CategoryModule
  ],

  controllers: [
    ProductController
  ],

  providers: [
    ProductRepository,
    ProductService
  ],

  exports: [
    ProductRepository
  ],

})

export class ProductModule { }
