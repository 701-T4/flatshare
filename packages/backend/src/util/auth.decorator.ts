import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseGuard } from '../guards/firebase.guard';

export function Auth() {
  return applyDecorators(UseGuards(FirebaseGuard), ApiBearerAuth());
}
