import IUser from '../interface/user.interface';
import { CreateUser } from '../dto/create-user.dto';

export default class UsersMockService {
  constructor(private mockUsersCollection) {
    this.mockUsersCollection = mockUsersCollection;
  }
  find() {
    return {
      exec: (): IUser[] => this.mockUsersCollection,
    };
  }

  findById(_id): IUser | Error {
    return (
      this.mockUsersCollection.find(({ id }) => id === _id) ||
      Error('User for given :id not found')
    );
  }

  create(user: CreateUser): IUser {
    this.mockUsersCollection.push(user);
    return user;
  }

  findByIdAndUpdate(_id, user): IUser {
    const index = this.mockUsersCollection.findIndex(({ id }) => id === _id);
    this.mockUsersCollection[index] = user;
    return user;
  }

  findByIdAndDelete(_id): void {
    const index = this.mockUsersCollection.findIndex(({ id }) => id === _id);
    this.mockUsersCollection[index].splice(index, 1);
  }
}
