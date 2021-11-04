import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

import { PrismaService } from './infra/prisma/Prisma.service';

@Module({
  imports: [UsersModule],
  providers: [
    PrismaService,
    { provide: 'UserRepository', useClass: UserRepository },
  ],
})
export class AppModule {}
