import { randomUUID } from 'crypto';
import { DecodedIdToken } from 'firebase-admin/auth';

export function getFakeUserToken(
  options?: Partial<DecodedIdToken>,
): DecodedIdToken {
  const uid = '36b8f84d-df4e-4d49-b662-bcde71a8764f';
  const tokenBase: DecodedIdToken = {
    uid,
    aud: 'my-project',
    auth_time: 1647112806300,
    exp: 2530725606300, //2050
    iss: 'https://securetoken.google.com/my-project',
    iat: 1647112986000,
    sub: uid,
    firebase: {
      sign_in_provider: 'password',
      identities: {},
    },
  };

  return { ...tokenBase, ...options };
}

export const mockModel = {
  create: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  findOne: jest.fn(),
};
