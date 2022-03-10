import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseGuard extends AuthGuard('firebase-auth') {}
