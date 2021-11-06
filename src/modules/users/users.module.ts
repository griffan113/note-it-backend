import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import auth from '@config/auth';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';
import UserRepository from './infra/prisma/repositories/UserRepository';
import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';
import UsersController from './infra/http/Users.controller';
import IndexUsersService from './services/IndexUsers.service';
import CreateUserService from './services/CreateUser.service';
import UpdateUserService from './services/UpdateUser.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: auth.jwt.expiresIn,
      },
    }),
  ],
  providers: [
    PrismaService,
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'IndexUsersService', useClass: IndexUsersService },
    { provide: 'CreateUserService', useClass: CreateUserService },
    { provide: 'UpdateUserService', useClass: UpdateUserService },
    { provide: 'HashProvider', useClass: BCryptHashProvider },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
