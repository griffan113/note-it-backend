import { IsHexColor, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(150)
  content: string;

  @IsHexColor()
  color: string;

  @IsUUID()
  user_id: string;
}
