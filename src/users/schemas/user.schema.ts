import { genderTypes } from '../interface/user.interface';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  id?: String;

  @Prop()
  username: String;

  @Prop()
  name: String;

  @Prop()
  middleName: String;

  @Prop()
  age: Number;

  @Prop()
  gender: genderTypes;
}

export const UserSchema = SchemaFactory.createForClass(User);
