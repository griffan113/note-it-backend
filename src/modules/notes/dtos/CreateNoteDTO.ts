import { IsString, IsUUID } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsUUID()
  user_id: string;
}
