import React from 'react';
import { useParams } from 'react-router-dom';

const CreatorProfile = () => {
  const { username } = useParams();

  // Mock data for creator's content
  const content = [
    { id: 1, title: 'First Video', thumbnail: 'https://via.placeholder.com/300x200', views: 1200 },
    { id: 2, title: 'Second Video', thumbnail: 'https://via.placeholder.com/300x200', views: 800 },
    { id: 3, title: 'Third Video', thumbnail: 'https://via.placeholder.com/300x200', views: 1500 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Creator Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{username}</h1>
              <p className="text-gray-600 mt-2">Content Creator</p>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;