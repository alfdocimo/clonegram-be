import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import IUser from './interface/user.interface';
import mockedUsersCollection from './__tests__/__mocks__/users-collection.mock';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = mockedUsersCollection;

  findAll(): IUser[] {
    return this.users;
  }

  findOneById(_id: string): IUser | HttpException {
    return (
      this.users.find(({ id }) => id === _id) ||
      new HttpException('User for given :id not found', HttpStatus.NOT_FOUND)
    );
  }

  createUser(user: IUser): void {
    this.users.push(user);
  }

  updateUser(_id: string, user: IUser): void | HttpException {
    const index = this.users.findIndex(({ id }) => id === _id);
    if (index < 0) {
      return new HttpException(
        'User for given :id not found',
        HttpStatus.NOT_FOUND,
      );
    } else this.users[index] = user;
  }

  deleteUser(_id: string): void | HttpException {
    const index = this.users.findIndex(({ id }) => id === _id);
    if (index < 0) {
      return new HttpException(
        'User for given :id not found',
        HttpStatus.NOT_FOUND,
      );
    } else this.users.splice(index, 1);
  }
}
