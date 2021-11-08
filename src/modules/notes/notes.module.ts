import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';

import NotesController from './infra/http/controllers/Notes.controller';
import NoteRepository from './infra/prisma/NoteRepository';
import IndexNotesService from './services/IndexNotes.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'NoteRepository', useClass: NoteRepository },
    { provide: 'IndexNotesService', useClass: IndexNotesService },
  ],
  controllers: [NotesController],
})
export class NotesModule {}
