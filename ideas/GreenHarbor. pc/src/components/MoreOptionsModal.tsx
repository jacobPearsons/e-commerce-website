import React from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, UserCircleIcon, BookmarkIcon, Cog6ToothIcon, CreditCardIcon, BuildingLibraryIcon, QuestionMarkCircleIcon, MoonIcon, GlobeAltIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

interface MoreOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Assuming user data might be passed to display in the modal
  user?: {
    avatarUrl?: string;
    displayName: string;
    username: string;
    fansCount: number;
    followingCount: number;
  };
}

const MoreOptionsModal: React.FC<MoreOptionsModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onClose}>
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-80" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center space-x-3">
            {/* User Avatar/Initials */}
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">{user?.displayName ? user.displayName.charAt(0) : 'JP'}</div>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-lg">{user?.displayName || 'Jacob Pearsons'}</span>
              <span className="text-gray-600 text-sm">@{user?.username || 'u501130422'}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* User Stats */}
        <div className="flex space-x-4 mb-4 text-sm text-gray-700">
          <span><b>{user?.fansCount || 0}</b> Fans</span>
          <span>•</span>
          <span><b>{user?.followingCount || 0}</b> Following</span>
        </div>

        {/* Navigation and Options */}
        <nav className="flex flex-col space-y-2">
          <Link to="/profile" onClick={onClose} className="flex items-center text-gray-700 hover:text-purple-600 py-2">
            <UserCircleIcon className="h-6 w-6 mr-3" />
            My profile
          </Link>
          <Link to="/collections" onClick={onClose} className="flex items-center text-gray-700 hover:text-purple-600 py-2">
            <BookmarkIcon className="h-6 w-6 mr-3" />
            Collections
          </Link>
           <Link to="/settings" onClick={onClose} className="flex items-center text-gray-700 hover:text-purple-600 py-2">
            <Cog6ToothIcon className="h-6 w-6 mr-3" />
            Settings
          </Link>
          <hr className="my-2"/> {/* Divider */}
          <Link to="/your-cards" onClick={onClose} className="flex items-center text-gray-700 hover:text-purple-600 py-2">
            <CreditCardIcon className="h-6 w-6 mr-3" />
            Your cards <span className="ml-2 text-xs text-gray-500">(to subscribe)</span>
          </Link>
           <Link to="/become-creator" onClick={onClose} className="flex items-center text-gray-700 hover:text-purple-600 py-2">
            <BuildingLibraryIcon className="h-6 w-6 mr-3" />
            Become a creator <span className="ml-2 text-xs text-gray-500">(to earn)</span>
          </Link>
           <hr className="my-2"/> {/* Divider */}
           <Link to="/help-support" onClick={onClose} className="flex items-center text-gray-700 hover:text-purple-600 py-2">
            <QuestionMarkCircleIcon className="h-6 w-6 mr-3" />
            Help and support
          </Link>
           {/* Dark Mode Toggle (Placeholder) */}
          <div className="flex items-center justify-between text-gray-700 py-2">
             <div className="flex items-center">
              <MoonIcon className="h-6 w-6 mr-3" />
              <span>Dark mode</span>
             </div>
             {/* Toggle Switch Placeholder */}
             <div className="w-10 h-6 bg-gray-300 rounded-full"></div>
          </div>
           {/* Language Selector (Placeholder) */}
          <div className="flex items-center justify-between text-gray-700 py-2">
             <div className="flex items-center">
              <GlobeAltIcon className="h-6 w-6 mr-3" />
              <span>English</span>
             </div>
             {/* Dropdown Arrow Placeholder */}
             <div className="w-4 h-4 bg-gray-500"></div>
          </div>
           <hr className="my-2"/> {/* Divider */}
          {/* Log Out Button */}
           <button onClick={onClose} className="flex items-center text-gray-700 hover:text-red-600 py-2 w-full">
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3" />
            Log out
          </button>
        </nav>

      </div>
    </div>
  );
};

export default MoreOptionsModal; 