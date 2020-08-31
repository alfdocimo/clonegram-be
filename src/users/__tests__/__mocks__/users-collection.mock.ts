import IUser, { genderTypes } from '../../interface/user.interface';

const users: IUser[] = [
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
  {
    id: '321',
    username: 'cool_dev',
    name: 'Ed',
    middleName: 'Dev',
    age: 30,
    gender: genderTypes.Male,
  },
];

export default users;
