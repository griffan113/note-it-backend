import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { ITokenPayload } from '@modules/users/types/ITokenPayload';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export default class JwtStrategyProvider extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }

  public async validate({ sub }: ITokenPayload) {
    const user = await this.userRepository.findById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
