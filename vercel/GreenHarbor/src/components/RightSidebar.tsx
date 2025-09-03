import React, { useState, useEffect } from 'react';
import Suggestion from './Suggestion';

interface UserSuggestion {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
}

const RightSidebar: React.FC = () => {
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [errorLoadingSuggestions, setErrorLoadingSuggestions] = useState<string | null>(null);

  useEffect(() => {
    // In a real application, you would fetch suggestions from your API here.
    // For now, using dummy data:
    const dummySuggestions: UserSuggestion[] = [
      {
        id: 'suggest1',
        username: 'userthree',
        displayName: 'User Three',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 'suggest2',
        username: 'userfour',
        displayName: 'User Four',
        avatarUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 'suggest3',
        username: 'userfive',
        displayName: 'User Five',
        avatarUrl: 'https://via.placeholder.com/150',
      },
    ];

    setSuggestions(dummySuggestions);
    setLoadingSuggestions(false);

    // Example of fetching from an API (uncomment and replace with your actual API endpoint):
    // const fetchSuggestions = async () => {
    //   try {
    //     const response = await fetch('/api/suggestions');
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch suggestions');
    //     }
    //     const data = await response.json();
    //     setSuggestions(data);
    //   } catch (err: any) {
    //     setErrorLoadingSuggestions(err.message);
    //   } finally {
    //     setLoadingSuggestions(false);
    //   }
    // };
    // fetchSuggestions();
  }, []);

  return (
    <div className="w-80 bg-white shadow-md p-4 flex flex-col space-y-6">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search posts"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Suggestions Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
        {loadingSuggestions && <p>Loading suggestions...</p>}
        {errorLoadingSuggestions && <p className="text-red-500">Error: {errorLoadingSuggestions}</p>}
        {!loadingSuggestions && suggestions.length === 0 && <p>No suggestions available.</p>}
        {!loadingSuggestions && suggestions.length > 0 && (
          <div className="space-y-4">
            {suggestions.map(user => (
              <Suggestion key={user.id} user={user} />
            ))
            }
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="mt-auto pt-6 text-xs text-gray-500 space-x-2">
        <a href="#" className="hover:underline">Privacy</a>
        <span>•</span>
        <a href="#" className="hover:underline">Cookie Notice</a>
        <span>•</span>
        <a href="#" className="hover:underline">Terms of Service</a>
      </div>
    </div>
  );
};

export default RightSidebar; 