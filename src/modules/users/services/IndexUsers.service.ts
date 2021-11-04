import { User } from '.prisma/client';
import { Inject, Injectable } from '@nestjs/common';

import UserRepository from '../infra/prisma/repositories/UserRepository';

@Injectable()
export default class IndexUsersService {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();

    return users;
  }
}
