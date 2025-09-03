import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Zionstone
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <p className="text-gray-600 mb-6">
          Discover our latest collection of high-quality products.
        </p>
        <Link
          to="/products"
          className="btn btn-primary inline-block"
        >
          View Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p className="text-gray-600">
            We are dedicated to providing the best quality products and services to our customers.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600">
            To deliver exceptional value and innovation through our products and services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home; 