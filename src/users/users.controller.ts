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
import IUser from './interface/user.interface';
import { CreateUser } from './dto/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<IUser | HttpException> {
    return this.usersService.findOneById(id);
  }

  @Post()
  @HttpCode(202)
  async create(@Body() user: CreateUser): Promise<void> {
    this.usersService.createUser(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: CreateUser,
  ): Promise<void | HttpException> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void | HttpException> {
    return this.usersService.deleteUser(id);
  }
}
