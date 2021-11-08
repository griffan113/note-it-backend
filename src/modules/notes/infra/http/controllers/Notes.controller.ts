import { Note } from '.prisma/client';
import { Controller, Get, Inject } from '@nestjs/common';

import IndexNotesService from '@modules/notes/services/IndexNotes.service';

@Controller('notes')
export default class NotesController {
  constructor(
    @Inject('IndexNotesService')
    private indexNotesService: IndexNotesService
  ) {}

  @Get()
  public async index(): Promise<Note[]> {
    const users = await this.indexNotesService.execute();

    return users;
  }
}
