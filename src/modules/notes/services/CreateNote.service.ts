import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Note, User } from '.prisma/client';
import { INoteRepository } from '../repositories/INoteRepository';
import { CreateNoteDTO } from '../dtos/CreateNoteDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@Injectable()
export default class CreateNoteService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: INoteRepository,

    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(
    currentUser: User,
    { color, content, title, user_id }: CreateNoteDTO
  ): Promise<Note> {
    const verifyUserExists = await this.userRepository.findById(user_id);

    if (!verifyUserExists) throw new NotFoundException('User not found');

    if (!currentUser.is_admin) {
      if (user_id !== currentUser.id) {
        throw new UnauthorizedException();
      }
    }

    const createNote = await this.noteRepository.create({
      color,
      content,
      title,
      user_id,
    });

    return createNote;
  }
}
