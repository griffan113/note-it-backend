import { Module } from '@nestjs/common';

import UserRepository from './infra/repositories/UserRepository';

@Module({
  providers: [{ provide: 'UserRepository', useClass: UserRepository }],
})
export class UsersModule {}
