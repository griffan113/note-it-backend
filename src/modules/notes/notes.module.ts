import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';

import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import NotesController from './infra/http/controllers/Notes.controller';
import NoteRepository from './infra/prisma/NoteRepository';
import CreateNoteService from './services/CreateNote.service';
import IndexNotesService from '../users/services/IndexNotesFromUser.service';
import DeleteNoteService from './services/DeleteNote.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'NoteRepository', useClass: NoteRepository },
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'IndexNotesService', useClass: IndexNotesService },
    { provide: 'CreateNoteService', useClass: CreateNoteService },
    { provide: 'DeleteNoteService', useClass: DeleteNoteService },
  ],
  controllers: [NotesController],
})
export class NotesModule {}
