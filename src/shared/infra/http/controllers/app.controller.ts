import { Controller, Get, Inject } from '@nestjs/common';
import { User } from '@prisma/client';
import UserRepository from '@modules/users/infra/repositories/UserRepository';

@Controller()
export class AppController {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  @Get()
  public async index(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
