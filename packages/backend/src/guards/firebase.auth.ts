import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import {
  initializeApp,
  cert,
  ServiceAccount,
  Credential,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin = require('firebase-admin');

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor() {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });

    // Prevent initialize multiple apps
    if (admin.apps.length === 0) {
      initializeApp({
        credential: FirebaseAuthStrategy.getCredentials(),
      });
    }
  }

  private static getCredentials(): Credential {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      return cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount,
      );
    } else {
      return cert('../../keys/firebase.json');
    }
  }

  // TODO: Remove this later and add a return type
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(token: string) {
    const firebaseUser = await getAuth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException();
    }

    return firebaseUser;
  }
}
