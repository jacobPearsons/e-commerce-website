import { Response } from 'express';
import { Post } from '../models/Post';
import { AuthenticatedRequest } from '../middleware/auth';
import { Types } from 'mongoose';

export const interactionController = {
  // Add a comment to a post
  async addComment(req: AuthenticatedRequest, res: Response) {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const userId = new Types.ObjectId(req.user?._id as string);

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const newComment = {
        user: userId,
        content,
        createdAt: new Date(),
        likes: []
      };

      post.comments.push(newComment);
      await post.save();
      res.status(201).json(post.comments[post.comments.length - 1]);
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment', error });
    }
  },

  // Like/Unlike a post
  async togglePostLike(req: AuthenticatedRequest, res: Response) {
    try {
      const { postId } = req.params;
      const userId = new Types.ObjectId(req.user?._id as string);

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const likeIndex = post.likes.findIndex(id => id.equals(userId));
      if (likeIndex === -1) {
        post.likes.push(userId);
      } else {
        post.likes.splice(likeIndex, 1);
      }

      await post.save();
      res.json({ likes: post.likes.length });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling like', error });
    }
  },

  // Like/Unlike a comment
  async toggleCommentLike(req: AuthenticatedRequest, res: Response) {
    try {
      const { postId, commentIndex } = req.params;
      const userId = new Types.ObjectId(req.user?._id as string);

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comment = post.comments[parseInt(commentIndex)];
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      const likeIndex = comment.likes.findIndex(id => id.equals(userId));
      if (likeIndex === -1) {
        comment.likes.push(userId);
      } else {
        comment.likes.splice(likeIndex, 1);
      }

      await post.save();
      res.json({ likes: comment.likes.length });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling comment like', error });
    }
  },

  // Delete a comment
  async deleteComment(req: AuthenticatedRequest, res: Response) {
    try {
      const { postId, commentIndex } = req.params;
      const userId = new Types.ObjectId(req.user?._id as string);

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comment = post.comments[parseInt(commentIndex)];
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Only allow comment author or post author to delete
      if (!comment.user.equals(userId) && !post.author.equals(userId)) {
        return res.status(403).json({ message: 'Not authorized to delete this comment' });
      }

      post.comments.splice(parseInt(commentIndex), 1);
      await post.save();
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting comment', error });
    }
  }
}; 