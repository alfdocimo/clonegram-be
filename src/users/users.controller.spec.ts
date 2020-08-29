import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import IUser, { genderTypes } from './interface/user.interface';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let users: IUser[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    users = [
      {
        id: '1234',
        username: 'alfdocimo',
        name: 'Alfredo',
        middleName: 'Narvaez',
        age: 25,
        gender: genderTypes.Male,
      },
      {
        id: '5678',
        username: 'l33tc0der',
        name: 'Jane',
        middleName: 'Doe',
        age: 25,
        gender: genderTypes.Female,
      },
    ];

    jest.spyOn(service, 'findAll').mockImplementation(() => users);
  });

  describe('Get', () => {
    it('should give back a collection of users', async () => {
      expect(await controller.findAll()).toBe(users);
    });
    it('should give back one user by :id', async () => {
      expect(await controller.findOneById('1234')).toEqual(users[0]);
    });
    it('should return error given an invalid :id', async () => {
      expect(await controller.findOneById('000')).toEqual(
        Error('User for given :id not found'),
      );
    });
  });

  describe('Post', () => {
    it('should add a user to the collection of users', async () => {
      const newUser = {
        id: '333',
        username: 'test_user',
        name: 'John',
        middleName: 'Doe',
        age: 25,
        gender: genderTypes.Female,
      };

      await controller.create(newUser);

      expect(await controller.findOneById('333')).toBe(newUser);
    });
  });
});
