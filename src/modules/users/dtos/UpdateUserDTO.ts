import { IsOptional, IsString } from 'class-validator';
import { CreateUserDTO } from './CreateUserDTO';

export class UpdateUserDTO extends CreateUserDTO {
  @IsOptional()
  @IsString()
  old_password: string;
}
