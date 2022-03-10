import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { UserStoreService } from 'src/db/user/userStore.service';
import { UserModel } from 'src/db/user/user.schema';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(private readonly userStoreService: UserStoreService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
    initializeApp({
      credential: cert(require('../../../../keys/firebase.json')),
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
