import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-700">404</h1>
        <h2 className="text-3xl font-semibold text-red-600 mt-4">Page Not Found</h2>
        <p className="text-red-900 mt-2 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 