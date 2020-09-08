import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import generateFakeUsers from '../src/users/__tests__/fake-users-generator';
import { CreateUser } from '../src/users/dto/create-user.dto';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../src/config';
import { User } from '../src/users/schemas/user.schema';
import { genderTypes } from '../src/users/interface/user.interface';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userCollection: User[] = [];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, MongooseModule.forRoot(config.MongoDBTestUri)],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it.each(generateFakeUsers(10))(
    'is able to create a new user %p',
    async (testUser: CreateUser) => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(testUser);

      userCollection.push(response.body);

      expect(response.status).toBe(202);
    },
  );

  it('is able to query all users', async () => {
    const response = await request(app.getHttpServer()).get(`/users`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it('is able to query one user', async () => {
    const response = await request(app.getHttpServer()).get(
      `/users/${userCollection[0]._id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userCollection[0]);
  });

  it('is able to modify one user and query it', async () => {
    const editedUser: CreateUser = {
      username: 'alfdocimo',
      name: 'Alfredo',
      middleName: 'Narvaez Docimo',
      age: 25,
      gender: genderTypes.Male,
    };
    const getUsersRsponse = await request(app.getHttpServer()).get(`/users`);

    const firstUser = getUsersRsponse.body[0]._id;

    const putUserReponse = await request(app.getHttpServer())
      .put(`/users/${firstUser}`)
      .send(editedUser);

    expect(putUserReponse.status).toBe(200);
    expect(putUserReponse.body).toEqual(
      expect.objectContaining({ ...editedUser }),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
