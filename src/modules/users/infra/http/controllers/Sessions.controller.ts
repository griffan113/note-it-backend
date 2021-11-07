import { CreateSessionDTO } from '@modules/users/dtos/CreateSessionDTO';
import AuthenticateUserService, {
  ICreateSessionResponse,
} from '@modules/users/services/AuthenticateUser.service';
import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';

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
}
