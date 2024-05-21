import { Request } from 'express';

type UserRequest = Request & {
  user?: any;
};

export { UserRequest };
