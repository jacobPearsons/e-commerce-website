import React, { useState } from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
// Assuming you have a component to display a single post
import Post from '../components/Post'; 

// Placeholder component for user's posts
const UserPosts = () => {
  // Dummy data for user's posts - replace with actual data fetching based on user ID
  const dummyUserPosts = [
    {
      id: 'userpost1',
      content: 'This is a post by this user.',
      createdAt: new Date().toISOString(),
      // ... other post properties
    },
    {
      id: 'userpost2',
      content: 'Another post from this user.',
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      // ... other post properties
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Posts</h3>
      {dummyUserPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        dummyUserPosts.map(post => <Post key={post.id} post={post} />)
      )}
    </div>
  );
};

// Placeholder component for user's about information
const UserAbout = () => {
  // Dummy user data - replace with actual data fetching based on user ID
  const dummyUser = {
    displayName: 'Jacob Pearsons',
    username: 'u501130422',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    joinDate: 'Joined January 2023',
    // ... other user info
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">About</h3>
      <div>
        <p className="text-gray-700"><span className="font-semibold">Display Name:</span> {dummyUser.displayName}</p>
        <p className="text-gray-700"><span className="font-semibold">Username:</span> @{dummyUser.username}</p>
        <p className="text-gray-700"><span className="font-semibold">Bio:</span> {dummyUser.bio}</p>
        <p className="text-gray-700"><span className="font-semibold">Member Since:</span> {dummyUser.joinDate}</p>
      </div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>(); // Get user ID from URL if applicable
  // In a real app, you would fetch user data based on userId

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Navigation Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <nav className="flex flex-col space-y-2">
          {/* Links to different sections of the profile */} 
          <Link to="posts" className="text-gray-700 hover:text-purple-600">Posts</Link>
          <Link to="about" className="text-gray-700 hover:text-purple-600">About</Link>
          {/* Add other profile sections like Media, Subscriptions, etc. */}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-3xl mx-auto py-8 px-4">
        {/* Nested Routes for Profile Sections */}
        <Routes>
          <Route path="posts" element={<UserPosts />} />
          <Route path="about" element={<UserAbout />} />
          {/* Default route or redirect */}
          <Route index element={<UserPosts />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage; 