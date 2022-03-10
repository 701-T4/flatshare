// Generate random house code
// Inspired by:
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript/1349426#1349426

import { Injectable } from '@nestjs/common';
@Injectable()
export class HouseUtil {
  constructor() {}
  generateString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
