import { Request, Response } from 'express';
import { ICreateCommentBody, ICommentParams } from './../types/comment';
import { IApiResponse } from '../types/common';
import Comment from '../models/Comment';
import Post from '../models/Post';

const createComment = async (
  req: Request<ICommentParams, {}, ICreateCommentBody>,
  res: Response<IApiResponse>
): Promise<void> => {
  const { postId } = req.params;
  const userId = req.user._id;
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: 'Text is required' });
    return;
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const comment = new Comment({
      user_id: userId,
      ref_id: postId,
      ref_type: 'Post',
      text,
    });

    await comment.save();

    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: comment._id },
        $inc: { comments_count: 1 },
      },
      { new: true }
    );

    res
      .status(201)
      .json({ message: 'Comment created successfully', data: comment });
  } catch (error) {
    res.status(500).json({ message: `Error creating comment: ${error}` });
  }
};

const deleteComment = async (
  req: Request,
  res: Response<IApiResponse>
): Promise<void> => {
  const { commentId } = req.params;
  const userId = req.user._id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (String(comment.user_id) !== String(userId)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    await Comment.findByIdAndDelete(commentId);

    if (comment.ref_type === 'Post') {
      await Post.findByIdAndUpdate(
        comment.ref_id,
        {
          $pull: { comments: comment._id },
          $inc: { comments_count: -1 },
        },
        { new: true }
      );
    }

    res.status(200).json({ message: 'Comment was successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: `Error deleting comment: ${error}` });
  }
};

export { createComment, deleteComment };
