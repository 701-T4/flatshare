import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import {
  initializeApp,
  cert,
  ServiceAccount,
  Credential,
} from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { UserStoreService } from 'src/db/user/userStore.service';
import { UserModel } from 'src/db/user/user.schema';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor() {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
    initializeApp({
      credential: FirebaseAuthStrategy.getCredentials(),
    });
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

  async validate(token: string): Promise<DecodedIdToken> {
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
