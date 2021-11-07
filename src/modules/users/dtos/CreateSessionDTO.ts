import { IsEmail, IsString } from 'class-validator';

export class CreateSessionDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
