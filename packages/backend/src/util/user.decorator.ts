import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  const user = req.getArgs()[0].user;
  if (user === undefined) {
    throw new TypeError('@User() is only valid on firebase guarded methods.');
  }
  return user;
});
