import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BellIcon, ChatBubbleLeftIcon, BookmarkIcon, UserGroupIcon, CreditCardIcon, UserCircleIcon, EllipsisHorizontalCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { logo } from '../assets/images';
import MoreOptionsModal from './MoreOptionsModal';

interface LeftSidebarProps {
  onNewPostClick: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onNewPostClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Placeholder user data - replace with actual data fetching
  const currentUser = {
    avatarUrl: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    displayName: 'Jacob Pearsons',
    username: 'u501130422',
    fansCount: 0,
    followingCount: 0,
  };

  return (
    <div className="w-64 bg-white shadow-md p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-6">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center text-gray-700 hover:text-purple-600">
          <HomeIcon className="h-6 w-6 mr-3" />
          Home
        </Link>
        <Link to="/notifications" className="flex items-center text-gray-700 hover:text-purple-600">
          <BellIcon className="h-6 w-6 mr-3" />
          Notifications
        </Link>
        <Link to="/messages" className="flex items-center text-gray-700 hover:text-purple-600">
          <ChatBubbleLeftIcon className="h-6 w-6 mr-3" />
          Messages
        </Link>
        <Link to="/collections" className="flex items-center text-gray-700 hover:text-purple-600">
          <BookmarkIcon className="h-6 w-6 mr-3" />
          Collections
        </Link>
        <Link to="/subscriptions" className="flex items-center text-gray-700 hover:text-purple-600">
          <UserGroupIcon className="h-6 w-6 mr-3" />
          Subscriptions
        </Link>
        <Link to="/add-card" className="flex items-center text-gray-700 hover:text-purple-600">
          <CreditCardIcon className="h-6 w-6 mr-3" />
          Add card
        </Link>
        <Link to="/profile" className="flex items-center text-gray-700 hover:text-purple-600">
          <UserCircleIcon className="h-6 w-6 mr-3" />
          My profile
        </Link>
        <button onClick={toggleModal} className="flex items-center text-gray-700 hover:text-purple-600">
          <EllipsisHorizontalCircleIcon className="h-6 w-6 mr-3" />
          More
        </button>
      </nav>

      {/* New Post Button */}
      <div className="mt-auto pt-4">
        <button
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-purple-700"
          onClick={onNewPostClick}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          NEW POST
        </button>
      </div>

      {/* More Options Modal */}
      <MoreOptionsModal isOpen={isModalOpen} onClose={toggleModal} user={currentUser} />
    </div>
  );
};

export default LeftSidebar; 