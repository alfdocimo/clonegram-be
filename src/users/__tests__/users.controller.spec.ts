import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import IUser, { genderTypes } from '../interface/user.interface';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import UsersMockService from '../__tests__/users.mockService';
import mockUsersCollection from '../__tests__/__mocks__/users-collection.mock';
import { CreateUser } from '../dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useFactory: () => {
            return new UsersMockService(mockUsersCollection);
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('[Get]', () => {
    it('should give back a collection of users', async () => {
      expect(await controller.findAll()).toBe(mockUsersCollection);
    });
    it('should give back one user by :id', async () => {
      expect(await controller.findOneById('1234')).toEqual(
        mockUsersCollection[0],
      );
    });
    it('should return error given an invalid :id', async () => {
      expect(await controller.findOneById('000')).toEqual(
        Error('User for given :id not found'),
      );
    });
  });

  describe('[Post]', () => {
    it('should add a user to the collection of users', async () => {
      const newUser: CreateUser = {
        id: '333',
        username: 'test_user',
        name: 'John',
        middleName: 'Doe',
        age: 25,
        gender: genderTypes.Male,
      };

      await controller.create(newUser);

      expect(await controller.findOneById('333')).toEqual(newUser);
    });
  });

  describe('[Put]', () => {
    it('should modify a user from the collection of users', async () => {
      const newUser: IUser = {
        id: '999',
        username: 'test_update_user',
        name: 'James',
        middleName: 'Doe',
        age: 30,
        gender: genderTypes.Male,
      };

      await controller.update('1234', newUser);

      expect(await controller.findOneById('999')).toBe(newUser);
    });
  });

  describe('[Delete]', () => {
    it('should delete a user from the collection of users', async () => {
      await controller.delete('1234');

      expect(await controller.findOneById('1234')).toEqual(
        Error('User for given :id not found'),
      );
    });
  });
});
