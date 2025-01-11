import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IApiResponse } from '../types/common';
import User from '../models/User';

const authMiddleware = async (
  req: Request,
  res: Response<IApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res
        .status(401)
        .json({ message: 'Access denied. Authorization token is required.' });
      return;
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (typeof JWT_SECRET_KEY !== 'string') {
      throw new Error('JWT_SECRET_KEY is required');
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: 'User is not found' });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
