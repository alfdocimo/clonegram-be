import {
  Controller,
  Get,
  Param,
  HttpException,
  Post,
  HttpCode,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User | HttpException> {
    return this.usersService.findOneById(id);
  }

  @Post()
  @HttpCode(202)
  async create(@Body() user: CreateUser): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: CreateUser,
  ): Promise<User | HttpException> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void | HttpException> {
    return this.usersService.deleteUser(id);
  }
}
