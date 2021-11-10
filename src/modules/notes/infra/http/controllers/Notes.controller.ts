import { Note, User } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { CreateNoteDTO } from '@modules/notes/dtos/CreateNoteDTO';
import CreateNoteService from '@modules/notes/services/CreateNote.service';
import DeleteNoteService from '@modules/notes/services/DeleteNote.service';
import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';

@Controller('notes')
export default class NotesController {
  constructor(
    @Inject('CreateNoteService')
    private createNoteService: CreateNoteService,

    @Inject('DeleteNoteService')
    private deleteNoteService: DeleteNoteService
  ) {}

  @Post()
  public async create(
    @GetUser() currentUser: User,
    @Body(ValidationPipe) createNoteDTO: CreateNoteDTO
  ): Promise<Note> {
    const createNote = await this.createNoteService.execute(
      currentUser,
      createNoteDTO
    );

    return createNote;
  }

  @Delete(':id')
  public async delete(
    @GetUser() currentUser: User,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Note> {
    const deleteNote = await this.deleteNoteService.execute(currentUser, {
      id,
    });

    return deleteNote;
  }
}
