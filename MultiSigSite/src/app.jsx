import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePageLayout from './components/HomePageLayout';

// Import actual authentication components
import LoginPage from './features/auth/components/Login';
import RegisterPage from './features/auth/components/Register';

// Import Profile Page component
import ProfilePage from './pages/ProfilePage';

// Placeholder components for other pages (replace with your actual components)
const NotificationsPage = () => <div className="p-8"><h2>Notifications Page - Under Construction</h2><p>This page is under development. Please replace this placeholder with your actual Notifications component.</p></div>;
const MessagesPage = () => <div className="p-8"><h2>Messages Page - Under Construction</h2><p>This page is under development. Please replace this placeholder with your actual Messages component.</p></div>;
const CollectionsPage = () => <div className="p-8"><h2>Collections Page - Under Construction</h2><p>This page is under development. Please replace this placeholder with your actual Collections component.</p></div>;
const SubscriptionsPage = () => <div className="p-8"><h2>Subscriptions Page - Under Construction</h2><p>This page is under development. Please replace this placeholder with your actual Subscriptions component.</p></div>;
const AddCardPage = () => <div className="p-8"><h2>Add Card Page - Under Construction</h2><p>This page is under development. Please replace this placeholder with your actual Add Card component.</p></div>;
// const ProfilePage = () => <div className="p-8"><h2>Profile Page - Under Construction</h2><p>This page is under development. Please replace this placeholder with your actual Profile component.</p></div>;
const MorePage = () => <div className="p-8"><h2>More Page - Under Construction</h2><p>This page is under development. Please replace this placeholder with your actual More component.</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePageLayout />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Profile Page */}
        <Route path="/profile/*" element={<ProfilePage />} /> {/* Use /* for nested routes */}

        {/* Sidebar Navigation Routes (Replace with actual components when ready) */}
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/add-card" element={<AddCardPage />} />
        {/* The /profile route is now handled above */}
        <Route path="/more" element={<MorePage />} />

        {/* Add other routes here, e.g., specific post pages, user profiles by ID, etc. */}

      </Routes>
    </BrowserRouter>
  );
}

export default App; 