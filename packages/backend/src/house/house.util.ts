// Generate random house code
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class HouseUtil {
  generateString(length) {
    const max_safe = 281474976710655; //Max int that can be safely reached by randomInt (2^48 - 1)
    return randomInt(max_safe).toString(36).substr(1, length).toUpperCase();
  }
}
