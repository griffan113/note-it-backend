import { Module } from '@nestjs/common';

import IndexUsersService from './services/IndexUsers.service';
import UserRepository from './infra/prisma/repositories/UserRepository';
import UsersController from './infra/http/Users.controller';

@Module({
  providers: [
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'IndexUsersService', useClass: IndexUsersService },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
