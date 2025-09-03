import React from 'react';

interface PostProps {
  post: {
    id: string;
    content: string;
    // Add other post properties as needed, e.g., author, media, likes, comments, etc.
    author?: {
      id: string;
      username: string;
      displayName: string;
      avatarUrl?: string;
    };
    media?: { url: string; type: string }[];
    createdAt: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {/* Post Header (e.g., Author info, timestamp) */}
      <div className="flex items-center mb-4">
        {post.author?.avatarUrl ? (
          <img src={post.author.avatarUrl} alt={post.author.username} className="w-10 h-10 rounded-full mr-4" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
        )}
        <div>
          <p className="font-semibold text-sm">{post.author?.displayName || post.author?.username || 'Anonymous'}</p>
          <p className="text-gray-600 text-xs">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 text-sm mb-4">{post.content}</p>

      {/* Post Media (Images/Videos) */}
      {post.media && post.media.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {post.media.map((mediaItem, index) => (
            <div key={index}>
              {mediaItem.type.startsWith('image') ? (
                <img src={mediaItem.url} alt={`Post media ${index}`} className="w-full h-auto rounded-md" />
              ) : (
                <video src={mediaItem.url} controls className="w-full h-auto rounded-md"></video>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post Actions (Likes, Comments, etc. - Placeholder) */}
      <div className="flex items-center space-x-4 text-gray-500 text-sm">
        <button className="flex items-center hover:text-purple-600">
          {/* Like Icon Placeholder */}
          <div className="w-4 h-4 bg-gray-300 mr-1"></div>
          Like
        </button>
        <button className="flex items-center hover:text-purple-600">
          {/* Comment Icon Placeholder */}
          <div className="w-4 h-4 bg-gray-300 mr-1"></div>
          Comment
        </button>
        {/* Share, etc. */}
      </div>
    </div>
  );
};

export default Post; 