import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

const MAX_SAFE = 2 ** 48 - 1; //Max int that can be safely reached by randomInt

@Injectable()
export class HouseUtil {
  generateString(length: number): string {
    return randomInt(MAX_SAFE).toString(36).substr(1, length).toUpperCase();
  }
}
