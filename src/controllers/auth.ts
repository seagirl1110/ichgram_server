import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IRegisterBody, ILoginBody } from '../types/auth';
import { IApiResponse } from '../types/common';
import User from '../models/User';

const register = async (
  req: Request<{}, {}, IRegisterBody>,
  res: Response<IApiResponse>
): Promise<void> => {
  try {
    const { fullName, userName, email, password } = req.body;

    if (!fullName || !userName || !email || !password) {
      res.status(400).json({ message: 'All field are required' });
      return;
    }

    const user = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (user) {
      res
        .status(400)
        .json({ message: 'User exists, userName and email must be unique' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User register successfully' });
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

const login = async (
  req: Request<{}, {}, ILoginBody>,
  res: Response<IApiResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'All field are required' });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (typeof JWT_SECRET_KEY !== 'string') {
      throw new Error('JWT_SECRET_KEY is required');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successfully', data: { token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { register, login };