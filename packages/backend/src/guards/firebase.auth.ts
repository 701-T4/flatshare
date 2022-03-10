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
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    initializeApp({
      credential: cert(require('../../../../keys/firebase.json')),
    });
  }

  async validate(token: string) {
    let userStoreService: UserStoreService;
    const firebaseUser = await getAuth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });

    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    // https://stackoverflow.com/questions/18214635/what-is-returned-from-mongoose-query-that-finds-no-matches
    if (userStoreService.findOneByFirebaseId(firebaseUser.uid) === null) {
      const userModel = new UserModel();
      userModel.firebaseId = firebaseUser.uid;
      userStoreService.create(userModel);
    }
    return firebaseUser;
  }
}
