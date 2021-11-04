import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';
import { User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  public async index(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
