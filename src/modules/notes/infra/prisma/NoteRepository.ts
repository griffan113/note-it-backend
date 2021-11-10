import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Note } from '@prisma/client';

import { CreateNoteDTO } from '@modules/notes/dtos/CreateNoteDTO';
import { INoteRepository } from '@modules/notes/repositories/INoteRepository';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';

@Injectable()
export default class NoteRepository implements INoteRepository {
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<Note | undefined> {
    const note = await this.ormRepository.note.findUnique({ where: { id } });

    return note;
  }

  public async findAllNotesFromUser(user_id: string): Promise<Note[]> {
    const notes = await this.ormRepository.note.findMany({
      where: { user_id },
    });

    return notes;
  }

  public async delete(id: string): Promise<Note> {
    const deleteNote = await this.ormRepository.note.delete({ where: { id } });

    return deleteNote;
  }

  public async create(noteData: CreateNoteDTO): Promise<Note> {
    const { content, title, user_id } = noteData;

    const note = await this.ormRepository.note.create({
      data: { content, title, user: { connect: { id: user_id } } },
    });

    return note;
  }

  public async update(note: Note): Promise<Note> {
    const { id, content, title } = note;

    const updateNote = await this.ormRepository.note.update({
      data: { content, title },
      where: { id },
    });

    return updateNote;
  }
}
