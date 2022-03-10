// Generate random house code
// Inspired by:
// https://nodejs.org/api/crypto.html#cryptorandombytessize-callback

import { Injectable } from '@nestjs/common';

@Injectable()
export class HouseUtil {
  generateString(length) {
    return require('crypto')
      .randomBytes(length / 2)
      .toString('hex')
      .toUpperCase();
  }
}
