import { Note } from '.prisma/client';

import { CreateNoteDTO } from '../dtos/CreateNoteDTO';

export interface INoteRepository {
  findById: (id: string) => Promise<Note | undefined>;
  findAllNotesFromUser: (user_id: string) => Promise<Note[]>;
  delete: (id: string) => Promise<Note>;
  create: (data: CreateNoteDTO) => Promise<Note>;
  update: (Note: Note) => Promise<Note>;
}
