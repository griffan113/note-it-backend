import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { UsersModule } from '@modules/users/users.module';
import { PrismaService } from './infra/prisma/Prisma.service';

@Module({
  imports: [
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
