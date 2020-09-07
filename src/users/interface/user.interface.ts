export enum genderTypes {
  Male = 'Male',
  Female = 'Female',
}

export default interface IUser {
  id?: string;
  username: string;
  name: string;
  middleName: string;
  age: number;
  gender: genderTypes;
}
