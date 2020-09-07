import { genderTypes } from '../interface/user.interface';

export class CreateUser {
  readonly id?: string;
  readonly username: string;
  readonly name: string;
  readonly middleName: string;
  readonly age: number;
  readonly gender: genderTypes;
}
