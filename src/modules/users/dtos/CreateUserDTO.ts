import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;
}
