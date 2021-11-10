import { Note, User } from '.prisma/client';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { INoteRepository } from '../repositories/INoteRepository';

interface IRequest {
  id: string;
}

@Injectable()
export default class DeleteNoteService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: INoteRepository
  ) {}

  public async execute(currentUser: User, { id }: IRequest): Promise<Note> {
    const findNote = await this.noteRepository.findById(id);

    if (!currentUser.is_admin) {
      if (findNote.user_id !== currentUser.id) {
        throw new UnauthorizedException();
      }
    }

    if (!findNote) throw new NotFoundException('Note not found');

    const deleteNote = await this.noteRepository.delete(id);

    return deleteNote;
  }
}
