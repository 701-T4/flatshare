// Generate random house code
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

const maxSafe = 2 ** 48 - 1; //Max int that can be safely reached by randomInt

@Injectable()
export class HouseUtil {
  generateString(length) {
    return randomInt(maxSafe).toString(36).substr(1, length).toUpperCase();
  }

  selectRandomUser(pool) {
    return pool[Math.floor(randomInt(maxSafe) * pool.length)];
  }
}
