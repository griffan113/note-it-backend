import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export default class UserRepository extends PrismaClient {
  public async getAllUsers(): Promise<User[]> {
    return this.user.findMany();
  }
}
