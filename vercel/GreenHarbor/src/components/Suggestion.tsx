import React from 'react';

interface SuggestionProps {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
  };
}

const Suggestion: React.FC<SuggestionProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between space-x-3">
      <div className="flex items-center space-x-3">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        )}
        <div>
          <p className="font-semibold text-sm">{user.displayName}</p>
          <p className="text-gray-600 text-xs">@{user.username}</p>
        </div>
      </div>
      {/* Follow button placeholder */}
      <button className="text-purple-600 text-sm font-semibold hover:text-purple-500">Follow</button>
    </div>
  );
};

export default Suggestion; 