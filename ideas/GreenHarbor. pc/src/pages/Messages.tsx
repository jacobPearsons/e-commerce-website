import React from 'react';
import { Link } from 'react-router-dom';

const Messages = () => {
  // Mock data for conversations
  const conversations = [
    { id: 1, username: 'user1', lastMessage: 'Hey, how are you?', timestamp: '10:30 AM' },
    { id: 2, username: 'user2', lastMessage: 'Thanks for the content!', timestamp: 'Yesterday' },
    { id: 3, username: 'user3', lastMessage: 'Can you post more?', timestamp: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="bg-white rounded-xl shadow-sm">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              to={`/chat/${conversation.id}`}
              className="block p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{conversation.username}</h3>
                  <p className="text-gray-600 text-sm mt-1">{conversation.lastMessage}</p>
                </div>
                <span className="text-gray-500 text-sm">{conversation.timestamp}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
