import { Note } from '.prisma/client';
import { Inject, Injectable } from '@nestjs/common';
import { INoteRepository } from '../repositories/INoteRepository';

@Injectable()
export default class IndexNotesService {
  constructor(
    @Inject('NoteRepository')
    private noteRepository: INoteRepository
  ) {}

  public async execute(): Promise<Note[]> {
    const notes = await this.noteRepository.findAllNotes();

    return notes;
  }
}
