import UserRepository from '@modules/users/infra/repositories/UserRepository';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

import { AppController } from './infra/http/controllers/app.controller';
import { PrismaService } from './infra/prisma/Prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    PrismaService,
    { provide: 'UserRepository', useClass: UserRepository },
  ],
})
export class AppModule {}
