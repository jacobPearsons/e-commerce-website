import React, { useState, useEffect } from 'react';
import { PostCreator } from '../features/content/components/PostCreator';
import Post from './Post';

interface PostData {
  id: string;
  content: string;
  author?: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
  media?: { url: string; type: string }[];
  createdAt: string;
}

interface MainContentProps {
  isCreatingPost: boolean;
  onPostCreated: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ isCreatingPost, onPostCreated }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorLoadingPosts, setErrorLoadingPosts] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you would fetch posts from your API here.
    // For now, using dummy data:
    const dummyPosts: PostData[] = [
      {
        id: '1',
        content: 'This is the first dummy post! It contains some sample content to demonstrate the layout.',
        author: {
          id: 'user1',
          username: 'userone',
          displayName: 'User One',
          avatarUrl: 'https://via.placeholder.com/150',
        },
        media: [
          { url: 'https://via.placeholder.com/600/FF5733/FFFFFF?text=Image+1', type: 'image' },
          { url: 'https://via.placeholder.com/600/33FF57/FFFFFF?text=Image+2', type: 'image' },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        content: 'Here is another post, demonstrating how multiple posts will look in the feed.',
        author: {
          id: 'user2',
          username: 'usertwo',
          displayName: 'User Two',
          avatarUrl: 'https://via.placeholder.com/150',
        },
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
    ];

    setPosts(dummyPosts);
    setLoadingPosts(false);

    // Example of fetching from an API (uncomment and replace with your actual API endpoint):
    // const fetchPosts = async () => {
    //   try {
    //     const response = await fetch('/api/posts');
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch posts');
    //     }
    //     const data = await response.json();
    //     setPosts(data);
    //   } catch (err: any) {
    //     setErrorLoadingPosts(err.message);
    //   } finally {
    //     setLoadingPosts(false);
    //   }
    // };
    // fetchPosts();
  }, []);

  return (
    <div className="flex-1">
      {isCreatingPost ? (
        <PostCreator />
      ) : (
        <div className="space-y-6 mt-8">
          <h3 className="text-xl font-bold mb-4">Feed</h3>
          {loadingPosts && <p>Loading posts...</p>}
          {errorLoadingPosts && <p className="text-red-500">Error: {errorLoadingPosts}</p>}
          {!loadingPosts && posts.length === 0 && <p>No posts available.</p>}
          {!loadingPosts && posts.length > 0 && (
            posts.map(post => (
              <Post key={post.id} post={post} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent; 