import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../types/user';

async function authToken(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || req.header;

    if (!token) {
      return res.status(200).json({
        message: 'User not Login',
        error: true,
      });
    }
    jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY!,
      (err: any, decoded: any) => {
        if (err) {
          throw new Error('Error in Auth.');
        }

        req.user = decoded?.id;
        next();
      }
    );
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

export default authToken;
