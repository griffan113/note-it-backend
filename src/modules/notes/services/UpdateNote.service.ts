import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Note, User } from '.prisma/client';
import { INoteRepository } from '../repositories/INoteRepository';

interface IRequest {
  id: string;
  title: string;
  content: string;
  color: string;
}

@Injectable()
export default class UpdateNoteService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: INoteRepository
  ) {}

  public async execute(
    currentUser: User,
    { id, title, content, color }: IRequest
  ): Promise<Note> {
    const findNote = await this.noteRepository.findById(id);

    if (!currentUser.is_admin) {
      if (findNote.user_id !== currentUser.id) {
        throw new UnauthorizedException();
      }
    }

    if (!findNote) throw new NotFoundException('Note not found');

    if (title) findNote.title = title;
    if (content) findNote.content = content;
    if (color) findNote.color = color;

    const updateNote = await this.noteRepository.update(findNote);

    return updateNote;
  }
}
