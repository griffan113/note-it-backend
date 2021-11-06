import { IsString } from 'class-validator';
import { CreateUserDTO } from './CreateUserDTO';

export class UpdateUserDTO extends CreateUserDTO {
  @IsString()
  old_password: string;
}
