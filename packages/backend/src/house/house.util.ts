// Generate random house code
// Inspired by:
// https://nodejs.org/api/crypto.html#cryptorandombytessize-callback

import { Injectable } from '@nestjs/common';

@Injectable()
export class HouseUtil {
  generateString(length) {
    const max_safe = 281474976710655;
    return require('crypto')
      .randomInt(max_safe)
      .toString(36)
      .substr(1, length)
      .toUpperCase();
  }
}
