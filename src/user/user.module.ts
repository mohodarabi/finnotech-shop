import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';


@Module({

  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],

  controllers: [
    UserController
  ],

  providers: [
    UserRepository,
  ],

  exports: [
    UserRepository
  ],

})

export class UserModule { }
