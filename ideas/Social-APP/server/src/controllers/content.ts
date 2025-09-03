import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { uploadToS3 } from '../utils/upload';
import { User } from '../models/User';

// Extend Express Request type to include user and files
interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
  files?: Express.Multer.File[];
}

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, isPrivate, price } = req.body;
    const authorId = req.user?._id;
    const videoFile = req.files?.[0] as Express.Multer.File;

    if (!authorId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!videoFile) {
      return res.status(400).json({ error: 'Video file is required' });
    }

    // Validate video file type
    if (!videoFile.mimetype.startsWith('video/')) {
      return res.status(400).json({ error: 'File must be a video' });
    }

    // Validate video file size (100MB max)
    if (videoFile.size > 100 * 1024 * 1024) {
      return res.status(400).json({ error: 'Video file size must be less than 100MB' });
    }

    if (isPrivate && (!price || price <= 0)) {
      return res.status(400).json({ error: 'Price is required for private content' });
    }

    // Upload video to S3
    const videoUrl = await uploadToS3(videoFile, 'content').catch(error => {
      throw new Error('Error uploading video file');
    });

    // Create new post
    const post = new Post({
      title,
      content: description || '',
      author: authorId,
      media: [{ url: videoUrl, type: 'video' }],
      isPrivate,
      price: isPrivate ? Number(price) : 0,
    });

    await post.save();

    return res.status(201).json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        id: post._id,
        title: post.title,
        content: post.content,
        media: post.media,
        isPrivate: post.isPrivate,
        price: post.price,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    console.error('Create post error:', error);
    return res.status(500).json({ 
      success: false,
      message: error instanceof Error ? error.message : 'Error creating post'
    });
  }
};

export const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content, isPrivate, price, tags } = req.body;
    const authorId = req.user?._id;
    const mediaFiles = req.files as Express.Multer.File[];

    if (!authorId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Find post and check ownership
    const post = await Post.findOne({ _id: postId, author: authorId });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    // Upload new media files if any
    let mediaUrls = post.media;
    if (mediaFiles && mediaFiles.length > 0) {
      const newMediaUrls = await Promise.all(
        mediaFiles.map((file) => uploadToS3(file, 'content'))
      ).catch(error => {
        throw new Error('Error uploading media files');
      });
      mediaUrls = newMediaUrls.map((url) => ({
        url,
        type: url.includes('video') ? 'video' : 'image',
      }));
    }

    // Update post
    post.title = title || post.title;
    post.content = content || post.content;
    post.media = mediaUrls;
    post.isPrivate = isPrivate ?? post.isPrivate;
    post.price = isPrivate ? (price || 0) : 0;
    post.tags = tags ? JSON.parse(tags) : post.tags;

    await post.save();

    return res.json({
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        media: post.media,
        isPrivate: post.isPrivate,
        price: post.price,
        tags: post.tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update post error:', error);
    return res.status(500).json({ error: 'Error updating post' });
  }
};

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const authorId = req.user?._id;

    if (!authorId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const post = await Post.findOneAndDelete({ _id: postId, author: authorId });
    if (!post) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting post' });
  }
};

export const getPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user?._id;

    const post = await Post.findById(postId)
      .populate('author', 'username displayName profileImage')
      .lean();

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user has access to private content
    if (post.isPrivate && post.author._id.toString() !== userId?.toString()) {
      // Check if user has purchased the content
      const hasPurchased = post.purchases.some(purchase => 
        purchase.toString() === userId?.toString()
      );
      if (!hasPurchased) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    // Increment view count
    await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });

    return res.json({ post });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching post' });
  }
};

export const getCreatorPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username } = req.params;
    const { page = 1, limit = 10, type = 'all' } = req.query;
    const userId = req.user?._id;

    const query: any = {};
    
    // Get creator's ID
    const creator = await User.findOne({ username, role: 'creator' });
    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    query.author = creator._id;

    // Filter by post type
    if (type === 'private') {
      query.isPrivate = true;
    } else if (type === 'public') {
      query.isPrivate = false;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    const total = await Post.countDocuments(query);

    // Filter out private content that hasn't been purchased
    const filteredPosts = posts.map(post => {
      if (post.isPrivate && post.author._id.toString() !== userId?.toString()) {
        const hasPurchased = post.purchases.some(purchase => 
          purchase.toString() === userId?.toString()
        );
        if (!hasPurchased) {
          return {
            ...post,
            content: 'This is private content',
            media: [],
          };
        }
      }
      return post;
    });

    return res.json({
      posts: filteredPosts,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Get creator posts error:', error);
    return res.status(500).json({ error: 'Error fetching posts' });
  }
};

// New function to get creator statistics
export const getCreatorStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const authorId = req.user?._id;

    if (!authorId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const stats = await Post.aggregate([
      { $match: { author: authorId } },
      {
        $group: {
          _id: null,
          totalPosts: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalPurchases: { $sum: { $size: '$purchases' } },
          totalEarnings: { $sum: { $multiply: [{ $size: '$purchases' }, '$price'] } },
        },
      },
    ]);

    return res.json({
      stats: stats[0] || {
        totalPosts: 0,
        totalViews: 0,
        totalPurchases: 0,
        totalEarnings: 0,
      },
    });
  } catch (error) {
    console.error('Get creator stats error:', error);
    return res.status(500).json({ error: 'Error fetching creator statistics' });
  }
};
