import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';

import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import NotesController from './infra/http/controllers/Notes.controller';
import NoteRepository from './infra/prisma/repositories/NoteRepository';
import CreateNoteService from './services/CreateNote.service';
import IndexNotesService from '../users/services/IndexNotesFromUser.service';
import DeleteNoteService from './services/DeleteNote.service';
import UpdateNoteService from './services/UpdateNote.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'NoteRepository', useClass: NoteRepository },
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'IndexNotesService', useClass: IndexNotesService },
    { provide: 'CreateNoteService', useClass: CreateNoteService },
    { provide: 'DeleteNoteService', useClass: DeleteNoteService },
    { provide: 'UpdateNoteService', useClass: UpdateNoteService },
  ],
  controllers: [NotesController],
})
export class NotesModule {}
