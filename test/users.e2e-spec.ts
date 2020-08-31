import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import mockUsersCollection from '../src/users/__tests__/__mocks__/users-collection.mock';
import { genderTypes } from '../src/users/interface/user.interface';
import { CreateUser } from '../src/users/dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it.each(mockUsersCollection)(
    'is able to create a new user %p',
    async (testUser: CreateUser) => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(testUser);

      expect(response.status).toBe(202);
    },
  );

  it('is able to query all users', async () => {
    const response = await request(app.getHttpServer()).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsersCollection);
  });

  it('is able to query one user', async () => {
    const response = await request(app.getHttpServer()).get('/users/1234');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ username: 'alfdocimo' }),
    );
  });

  it('is able to modify one user and query it', async () => {
    const editedUser: CreateUser = {
      id: '987',
      username: 'alfdocimo',
      name: 'Alfredo',
      middleName: 'Narvaez Docimo',
      age: 25,
      gender: genderTypes.Male,
    };
    await request(app.getHttpServer())
      .put('/users/1234')
      .send(editedUser);

    const response = await request(app.getHttpServer()).get('/users/987');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(editedUser);
  });

  afterAll(async () => {
    await app.close();
  });
});
