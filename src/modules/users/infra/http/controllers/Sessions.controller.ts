import { User } from '.prisma/client';
import { CreateSessionDTO } from '@modules/users/dtos/CreateSessionDTO';
import AuthenticateUserService, {
  ICreateSessionResponse,
} from '@modules/users/services/AuthenticateUser.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/GetUser.decorator';

@Controller('sessions')
export default class SessionsController {
  constructor(
    @Inject('AuthenticateUserService')
    private authenticateUserService: AuthenticateUserService
  ) {}

  @Post()
  public async create(
    @Body(ValidationPipe) createSessionDTO: CreateSessionDTO
  ): Promise<ICreateSessionResponse> {
    const session = await this.authenticateUserService.execute(
      createSessionDTO
    );

    return session;
  }

  @UseGuards(AuthGuard())
  @Get()
  public async index(@GetUser() user: User) {
    return user;
  }
}
