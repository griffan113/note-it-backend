import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '.prisma/client';

import { IUserRepository } from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

@Injectable()
export default class UpdateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    email,
    name,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) throw new NotFoundException('User not found');

    if (email) {
      const verifyEmailAvailability = await this.userRepository.findByEmail(
        email
      );

      if (verifyEmailAvailability && verifyEmailAvailability.id !== findUser.id)
        throw new BadRequestException('Email already used');

      findUser.email = email;
    }

    if (name) findUser.name = name;

    if (password && !old_password)
      throw new BadRequestException('Old password missing');

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        findUser.password
      );

      if (!checkOldPassword)
        throw new BadRequestException('Old password does not match');

      findUser.password = await this.hashProvider.generateHash(password);
    }

    const updateUser = await this.userRepository.update(findUser);

    return updateUser;
  }
}
