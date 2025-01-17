import { Request, Response } from 'express';
import { IApiResponse } from '../types/common';
import Follow from '../models/Follow';
import User from '../models/User';

const getUserFollowers = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(404).json({ message: 'UserId is required' });
    return;
  }

  try {
    const followers = await Follow.find({ followed_user_id: userId }).populate(
      'follower_user_id',
      'username image'
    );
    res.status(200).json({ message: 'Followers list', data: followers });
  } catch (error) {
    res.status(500).json({ message: `Error getting followers: ${error}` });
  }
};

const getUserFollowing = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(404).json({ message: 'UserId is required' });
    return;
  }

  try {
    const followings = await Follow.find({ follower_user_id: userId }).populate(
      'followed_user_id',
      'username image'
    );
    res.status(200).json({ message: 'Followings list', data: followings });
  } catch (error) {
    res.status(500).json({ message: `Error getting followings: ${error}` });
  }
};

const followUser = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  if (!targetUserId) {
    res.status(404).json({ message: 'TargetUserId is required' });
    return;
  }

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const existingFollow = await Follow.findOne({
      follower_user_id: userId,
      followed_user_id: targetUser,
    });

    if (existingFollow) {
      res.status(400).json({ message: 'You have already followed this user' });
      return;
    }

    const follow = new Follow({
      follower_user_id: userId,
      followed_user_id: targetUserId,
    });
    await follow.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { following: targetUser._id },
        $inc: { following_count: 1 },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      targetUser,
      {
        $push: { followers: user._id },
        $inc: { followers_count: 1 },
      },
      { new: true }
    );
    res.status(201).json({ message: 'Follow successfully', data: follow });
  } catch (error) {
    res.status(500).json({ message: `Error follow user: ${error}` });
  }
};

const unfollowUser = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  if (!targetUserId) {
    res.status(404).json({ message: 'TargetUserId is required' });
    return;
  }

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const existingFollow = await Follow.findOne({
      follower_user_id: userId,
      followed_user_id: targetUserId,
    });

    if (!existingFollow) {
      res.status(400).json({ message: 'You have not followed this user' });
      return;
    }

    await Follow.findByIdAndDelete(existingFollow._id);

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { following: targetUser._id },
        $inc: { following_count: -1 },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      targetUser,
      {
        $pull: { followers: user._id },
        $inc: { followers_count: -1 },
      },
      { new: true }
    );
    res.status(201).json({ message: 'Unfollow successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error follow user: ${error}` });
  }
};

export { getUserFollowers, getUserFollowing, followUser, unfollowUser };
