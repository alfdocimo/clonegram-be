import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import config from './config';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(config.MongoDBUri)],
})
export class AppModule {}
