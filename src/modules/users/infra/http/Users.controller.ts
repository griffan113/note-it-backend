import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import CreateUserService from '@modules/users/services/CreateUser.service';
import IndexUsersService from '@modules/users/services/IndexUsers.service';
import { UpdateUserDTO } from '@modules/users/dtos/UpdateUserDTO';
import UpdateUserService from '@modules/users/services/UpdateUser.service';

@Controller('users')
export default class UsersController {
  constructor(
    @Inject('IndexUsersService')
    private indexUsersService: IndexUsersService,

    @Inject('CreateUserService')
    private createUserService: CreateUserService,

    @Inject('UpdateUserService')
    private updateUserService: UpdateUserService
  ) {}

  @Get()
  public async index(): Promise<User[]> {
    const users = await this.indexUsersService.execute();

    return users;
  }

  @Post()
  public async create(
    @Body(ValidationPipe) createUserDto: CreateUserDTO
  ): Promise<User> {
    const createUser = await this.createUserService.execute(createUserDto);

    return createUser;
  }

  @Put('/:id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDTO
  ): Promise<User> {
    const updateUser = await this.updateUserService.execute({
      id,
      ...updateUserDto,
    });

    return updateUser;
  }
}
