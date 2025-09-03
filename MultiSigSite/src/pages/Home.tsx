import * as React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Fatality - Revolutionizing Crypto Transactions with Transparency & Security
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Multi-signature wallets • Real-time transaction tracking • Unmatched transparency
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Connect Your Wallet
            </Link>
            <Link
              to="/discover"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-purple-600"
            >
              Discover Us
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div 
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-purple-600 text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
            <p className="text-gray-600">
              Your content is protected with state-of-the-art security measures
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-purple-600 text-3xl mb-4">💎</div>
            <h3 className="text-xl font-semibold mb-3">Premium Content</h3>
            <p className="text-gray-600">
              Share exclusive content with your subscribers
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-purple-600 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">Monetize</h3>
            <p className="text-gray-600">
              Earn from your content with flexible subscription options
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-purple-100">
            Join thousands of creators who are already sharing their content
          </p>
          <Link
            to="/register"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 