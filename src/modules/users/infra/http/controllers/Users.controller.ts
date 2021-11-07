import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { UpdateUserDTO } from '@modules/users/dtos/UpdateUserDTO';
import CreateUserService from '@modules/users/services/CreateUser.service';
import IndexUsersService from '@modules/users/services/IndexUsers.service';
import UpdateUserService from '@modules/users/services/UpdateUser.service';
import DeleteUserService from '@modules/users/services/DeleteUser.service';
import { SetPublicRoute } from '../decorators/SetPublicRoute.decorator';
import { EnsureAdminGuard } from '../guards/EnsureAdmin.guard';

@Controller('users')
export default class UsersController {
  constructor(
    @Inject('IndexUsersService')
    private indexUsersService: IndexUsersService,

    @Inject('CreateUserService')
    private createUserService: CreateUserService,

    @Inject('UpdateUserService')
    private updateUserService: UpdateUserService,

    @Inject('DeleteUserService')
    private deleteUserService: DeleteUserService
  ) {}

  @UseGuards(EnsureAdminGuard)
  @Get()
  public async index(): Promise<User[]> {
    const users = await this.indexUsersService.execute();

    return users;
  }

  @SetPublicRoute()
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

  @Delete('/:id')
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const deleteUser = await this.deleteUserService.execute({ id });

    return deleteUser;
  }
}
