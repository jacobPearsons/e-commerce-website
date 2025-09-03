import { Response } from 'express';
import { User } from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';
import { Types } from 'mongoose';

export const userController = {
  // Follow a user
  async followUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { username } = req.params;
      const userId = new Types.ObjectId(req.user?._id as string);

      const userToFollow = await User.findOne({ username });
      if (!userToFollow) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Can't follow yourself
      if (userToFollow._id.toString() === userId.toString()) {
        return res.status(400).json({ message: 'Cannot follow yourself' });
      }

      const currentUser = await User.findById(userId);
      if (!currentUser) {
        return res.status(404).json({ message: 'Current user not found' });
      }

      // Check if already following
      if (currentUser.following?.some(id => id.equals(userToFollow._id))) {
        return res.status(400).json({ message: 'Already following this user' });
      }

      // Add to following and followers
      if (!currentUser.following) currentUser.following = [];
      if (!userToFollow.followers) userToFollow.followers = [];
      
      currentUser.following.push(new Types.ObjectId(userToFollow._id));
      userToFollow.followers.push(userId);

      await Promise.all([currentUser.save(), userToFollow.save()]);

      res.json({ 
        message: 'Successfully followed user',
        following: currentUser.following.length,
        followers: userToFollow.followers.length
      });
    } catch (error) {
      res.status(500).json({ message: 'Error following user', error });
    }
  },

  // Unfollow a user
  async unfollowUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { username } = req.params;
      const userId = new Types.ObjectId(req.user?._id as string);

      const userToUnfollow = await User.findOne({ username });
      if (!userToUnfollow) {
        return res.status(404).json({ message: 'User not found' });
      }

      const currentUser = await User.findById(userId);
      if (!currentUser) {
        return res.status(404).json({ message: 'Current user not found' });
      }

      // Check if actually following
      if (!currentUser.following?.some(id => id.equals(userToUnfollow._id))) {
        return res.status(400).json({ message: 'Not following this user' });
      }

      // Remove from following and followers
      if (currentUser.following) {
        currentUser.following = currentUser.following.filter(
          id => !id.equals(userToUnfollow._id)
        );
      }
      if (userToUnfollow.followers) {
        userToUnfollow.followers = userToUnfollow.followers.filter(
          id => !id.equals(userId)
        );
      }

      await Promise.all([currentUser.save(), userToUnfollow.save()]);

      res.json({ 
        message: 'Successfully unfollowed user',
        following: currentUser.following?.length || 0,
        followers: userToUnfollow.followers?.length || 0
      });
    } catch (error) {
      res.status(500).json({ message: 'Error unfollowing user', error });
    }
  },

  // Get user's followers
  async getFollowers(req: AuthenticatedRequest, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username })
        .populate('followers', 'username displayName profileImage');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.followers || []);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching followers', error });
    }
  },

  // Get user's following
  async getFollowing(req: AuthenticatedRequest, res: Response) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username })
        .populate('following', 'username displayName profileImage');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.following || []);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching following', error });
    }
  }
}; 