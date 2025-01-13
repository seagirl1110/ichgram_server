import { Request, Response } from 'express';
import { ICreatePostBody } from '../types/post';
import { IApiResponse } from '../types/common';
import User from '../models/User';
import Post from '../models/Post';

const createPost = async (
  req: Request<{}, {}, ICreatePostBody>,
  res: Response<IApiResponse>
): Promise<void> => {
  const { description } = req.body;
  const userId = req.user._id;

  try {
    const post = new Post({
      user_id: userId,
      images: ['test_file'],
      description,
    });

    await post.save();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { posts: post._id },
        $inc: { posts_count: 1 },
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(201).json({ message: 'Post created successfully', data: post });
  } catch (error) {
    res.status(500).json({ message: `Error creating post: ${error}` });
  }
};

export { createPost };
