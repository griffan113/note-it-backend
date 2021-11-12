import { IsHexColor, IsString, MaxLength } from 'class-validator';

export class UpdateNoteDTO {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(150)
  content: string;

  @IsHexColor()
  color: string;
}
