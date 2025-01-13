import { Request, Response } from 'express';
import { ISearchQuery } from '../types/search';
import { IApiResponse } from '../types/common';
import User from '../models/User';
import Post from '../models/Post';

const searchUsers = async (
  req: Request<ISearchQuery>,
  res: Response<IApiResponse>
): Promise<void> => {
  const { query } = req.query;

  try {
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
    }).select(['_id', 'username', 'image']);

    if (users.length === 0) {
      res.status(404).json({ message: 'No users found matching this request' });
      return;
    }

    res.status(200).json({ message: 'Users found', data: users });
  } catch (error) {
    res.status(500).json({ message: `Error searching users: ${error}` });
  }
};

const searchPosts = async (
  req: Request<ISearchQuery>,
  res: Response<IApiResponse>
): Promise<void> => {
  const { query } = req.query;

  try {
    const posts = await Post.find(
      query
        ? {
            description: { $regex: query, $options: 'i' },
          }
        : {}
    );

    if (posts.length === 0) {
      res.status(404).json({ message: 'No posts found matching this request' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Posts found', data: { count: posts.length, posts } });
  } catch (error) {
    res.status(500).json({ message: `Error fetching posts: ${error}` });
  }
};

export { searchUsers, searchPosts };
