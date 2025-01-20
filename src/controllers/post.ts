import { Request, Response } from 'express';
import { ICreatePostBody, IUpdatePostBody, IPostParams } from '../types/post';
import { IApiResponse } from '../types/common';
import User from '../models/User';
import Post from '../models/Post';
import upload from '../middlewares/multer';

const createPost = async (
  req: Request<{}, {}, ICreatePostBody>,
  res: Response<IApiResponse>
): Promise<void> => {
  const { description } = req.body;
  const userId = req.user._id;

  try {
    if (!req.file) {
      res.status(400).json({ message: 'Image is required' });
      return;
    }

    const base64Img = req.file.buffer.toString('base64');

    const post = new Post({
      user_id: userId,
      images: [`data:image/jpeg:base64,${base64Img}`],
      description,
    });

    await post.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { posts: post._id },
        $inc: { posts_count: 1 },
      },
      { new: true }
    );

    res.status(201).json({ message: 'Post created successfully', data: post });
  } catch (error) {
    res.status(500).json({ message: `Error creating post: ${error}` });
  }
};

const getPost = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId)
      .populate('user_id', 'username image')
      .populate('comments')
      .populate('likes');

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Post found', data: post });
  } catch (error) {
    res.status(500).json({ message: `Error getting post: ${error}` });
  }
};

const updatePost = async (
  req: Request<IPostParams, {}, IUpdatePostBody>,
  res: Response<IApiResponse>
): Promise<void> => {
  const { postId } = req.params;
  const { description } = req.body;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (String(post.user_id) !== String(userId)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    if (description) {
      post.description = description;
    }

    await post.save();

    res
      .status(200)
      .json({ message: 'Post was successfully update', data: post });
  } catch (error) {
    res.status(500).json({ message: `Error updating post: ${error}` });
  }
};

const deletePost = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    if (String(post.user_id) !== String(userId)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    await Post.findByIdAndDelete(postId);

    await User.findByIdAndUpdate(
      post.user_id,
      {
        $pull: { posts: post._id },
        $inc: { posts_count: -1 },
      },
      { new: true }
    );

    res.status(200).json({ message: 'Post was successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting post: ${error}` });
  }
};

export const uploadPostImg = upload.single('images');

export { createPost, getPost, updatePost, deletePost };
