import IndexUsersService from '@modules/users/services/IndexUsers.service';
import { Controller, Get, Inject } from '@nestjs/common';
import { User } from '@prisma/client';

@Controller('users')
export default class UsersController {
  constructor(
    @Inject('IndexUsersService')
    private indexUsersService: IndexUsersService
  ) {}

  @Get()
  public async index(): Promise<User[]> {
    const users = await this.indexUsersService.execute();

    return users;
  }
}
