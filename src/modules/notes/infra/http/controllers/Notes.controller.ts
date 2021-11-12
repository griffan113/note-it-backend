import { Note, User } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { CreateNoteDTO } from '@modules/notes/dtos/CreateNoteDTO';
import CreateNoteService from '@modules/notes/services/CreateNote.service';
import DeleteNoteService from '@modules/notes/services/DeleteNote.service';
import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { UpdateNoteDTO } from '@modules/notes/dtos/UpdateNoteDTO';
import UpdateNoteService from '@modules/notes/services/UpdateNote.service';

@Controller('notes')
export default class NotesController {
  constructor(
    @Inject('CreateNoteService')
    private createNoteService: CreateNoteService,

    @Inject('DeleteNoteService')
    private deleteNoteService: DeleteNoteService,

    @Inject('UpdateNoteService')
    private updateNoteService: UpdateNoteService
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

  @Put(':id')
  public async udpate(
    @GetUser() currentUser: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateNoteDTO: UpdateNoteDTO
  ): Promise<Note> {
    const updateNote = await this.updateNoteService.execute(currentUser, {
      id,
      ...updateNoteDTO,
    });

    return updateNote;
  }
}
