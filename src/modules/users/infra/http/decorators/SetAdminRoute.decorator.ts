import { UseGuards } from '@nestjs/common';

import { EnsureAdminGuard } from '../guards/EnsureAdmin.guard';

export const SetAdminRoute = () => UseGuards(EnsureAdminGuard);
