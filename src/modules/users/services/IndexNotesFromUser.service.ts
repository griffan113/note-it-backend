import { Note } from '.prisma/client';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { INoteRepository } from '@modules/notes/repositories/INoteRepository';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

interface IRequest {
  user_id: string;
}

@Injectable()
export default class IndexNotesService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: INoteRepository,

    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Note[]> {
    const verifyUserExists = await this.userRepository.findById(user_id);

    if (!verifyUserExists) throw new NotFoundException('User not found');

    const notes = await this.noteRepository.findAllNotesFromUser(user_id);

    return notes;
  }
}
