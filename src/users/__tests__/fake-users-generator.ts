import * as faker from 'faker';

import User, { genderTypes } from '../interface/user.interface';

const generateFakeUsers = (amount: number): Array<User> => {
  const fakeUsersList: User[] = [];
  while (fakeUsersList.length <= amount) {
    fakeUsersList.push({
      username: faker.internet.userName(),
      name: faker.name.firstName(),
      middleName: faker.name.lastName(),
      age: Math.floor(Math.random() * Math.floor(60)),
      gender: (Math.random() && genderTypes.Male) || genderTypes.Female,
    });
  }

  return fakeUsersList;
};

export default generateFakeUsers;
