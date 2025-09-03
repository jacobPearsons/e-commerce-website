import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';

const HomePageLayout: React.FC = () => {
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const togglePostCreator = () => {
    setIsCreatingPost(!isCreatingPost);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <LeftSidebar onNewPostClick={togglePostCreator} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-3xl mx-auto py-8 px-4">
        <MainContent isCreatingPost={isCreatingPost} onPostCreated={togglePostCreator} />
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white shadow-md p-4">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePageLayout; 