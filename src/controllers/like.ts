import { Request, Response } from 'express';
import { IApiResponse } from '../types/common';
import Post from '../models/Post';
import Like from '../models/Like';

const likePost = async (
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

    const existingLike = await Like.findOne({
      ref_id: postId,
      ref_type: 'Post',
      user_id: userId,
    });

    if (existingLike) {
      res.status(400).json({ message: 'This post has already been liked' });
      return;
    }

    const like = new Like({
      user_id: userId,
      ref_id: postId,
      ref_type: 'Post',
    });

    await like.save();

    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: like._id },
        $inc: { likes_count: 1 },
      },
      { new: true }
    );

    res.status(201).json({ message: 'Liked post successfully', data: like });
  } catch (error) {
    res.status(500).json({ message: `Error liked post: ${error}` });
  }
};

const unlikePost = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { postId } = req.params;
  const userId = req.user._id;

  try {
    const like = await Like.findOne({
      ref_id: postId,
      ref_type: 'Post',
      user_id: userId,
    });

    if (!like) {
      res.status(404).json({ message: 'Like not found' });
      return;
    }

    await Like.findByIdAndDelete(like._id);

    await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: like._id },
        $inc: { likes_count: -1 },
      },
      { new: true }
    );

    res.status(201).json({ message: 'UnLiked post successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error unliked post: ${error}` });
  }
};

export { likePost, unlikePost };
