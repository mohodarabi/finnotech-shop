import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './model/user.schema';
import { CustomHttpException } from 'src/filters/custom-http.exception';
import { IUserDocument } from './model/interface/user-document.interface';


/**
 * this class is used to customize user side queries
 */
@Injectable()
export class UserRepository {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  /**
   * Create a new user
   */
  async create(data: Partial<User>): Promise<UserDocument> {

    const user = await this.userModel.create(data);

    if (!user) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return user

  }

  /**
   * Find specific user
   */
  async findOne(data: Partial<IUserDocument>, selectOptions?: string): Promise<UserDocument> {

    return this.userModel.findOne(data).select(selectOptions);

  }

  /**
   * Find user by id
   */
  async findById(id: string, selectOptions?: string): Promise<UserDocument> {

    return this.userModel.findById(id).select(selectOptions);

  }

  /**
   * Update user data
   */
  async updateOne(id: string, data: Partial<IUserDocument>): Promise<any> {

    const updatedUser = await this.userModel.updateOne({ _id: id }, { $set: data });

    if (updatedUser.modifiedCount <= 0) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return updatedUser

  }

  /**
   * Delete user
   */
  async deleteOne(id: string): Promise<UserDocument> {

    const user = await this.findById(id)

    const deletedUser = await this.userModel.deleteOne({ _id: id });

    if (deletedUser.deletedCount) {
      throw new CustomHttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong')
    }

    return user

  }

}