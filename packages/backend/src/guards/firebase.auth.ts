import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { UserStoreService } from 'src/db/user/userStore.service';
import { UserModel } from 'src/db/user/user.schema';
import * as firebaseCredentials from '../../../../keys/firebase.json';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(private readonly userStoreService: UserStoreService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
    initializeApp({
      credential: cert(firebaseCredentials as ServiceAccount),
    });
  }

  async validate(token: string) {
    const firebaseUser = await getAuth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException();
    }

    if (
      (await this.userStoreService.findOneByFirebaseId(firebaseUser.uid)) ===
      null
    ) {
      const userModel = new UserModel();
      userModel.firebaseId = firebaseUser.uid;
      await this.userStoreService.create(userModel);
    }
    return firebaseUser;
  }
}
