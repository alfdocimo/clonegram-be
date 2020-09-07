import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(_id: string): Promise<User | HttpException> {
    try {
      return this.userModel.findById(_id);
    } catch {
      new HttpException('User for given :id not found', HttpStatus.NOT_FOUND);
    }
  }

  async createUser(createUser: CreateUser): Promise<User> {
    try {
      const createdUser = this.userModel.create(createUser);
      return createdUser;
    } catch {
      new HttpException(
        'Cant create User at this moment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    _id: string,
    user: CreateUser,
  ): Promise<User | HttpException> {
    try {
      return this.userModel.findByIdAndUpdate(_id, user);
    } catch {
      new HttpException('User for given :id not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(_id: string): Promise<void | HttpException> {
    try {
      await this.userModel.findByIdAndDelete(_id);
    } catch (error) {
      new HttpException('User for given :id not found', HttpStatus.NOT_FOUND);
    }
  }
}
