import { Request, Response } from 'express';
import { IGetProfileParams, IUpdateProfileBody } from '../types/user';
import { IApiResponse } from '../types/common';
import User from '../models/User';

const getUserProfile = async (
  req: Request<IGetProfileParams>,
  res: Response<IApiResponse>
): Promise<void> => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId)
      .select(['-password'])
      .populate('posts');

    if (!user) {
      res.status(404).json({ message: 'User is not found' });
      return;
    }

    res.status(200).json({ message: 'User found', data: user });
  } catch (error) {
    res.status(500).json({ message: `Error fetching user's data: ${error}` });
  }
};

const updateUserProfile = async (
  req: Request<{}, {}, IUpdateProfileBody>,
  res: Response<IApiResponse>
): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: 'Unauthorized access' });
      return;
    }

    const { username, bio, website } = req.body;

    if (bio) {
      user.bio = bio;
    }

    if (website) {
      user.website = website;
    }

    if (username) {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        res.status(400).json({
          message: 'this username is taken',
        });
        return;
      }

      user.username = username;
    }

    await user.save();

    res.status(200).json({ message: 'Update profile is successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error updating profile: ${error}` });
  }
};

export { getUserProfile, updateUserProfile };
