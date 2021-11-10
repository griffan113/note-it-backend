import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';

import IndexNotesService from '@modules/users/services/IndexNotesFromUser.service';
import { Note } from '.prisma/client';

@Controller('users')
export default class IndexNotesFromUserController {
  constructor(
    @Inject('IndexNotesService')
    private indexNotesService: IndexNotesService
  ) {}

  @Get(':id/notes')
  public async show(@Param('id', ParseUUIDPipe) id: string): Promise<Note[]> {
    const showUser = await this.indexNotesService.execute({ user_id: id });

    return showUser;
  }
}
