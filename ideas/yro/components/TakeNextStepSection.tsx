import React from 'react';
import { Link } from 'react-router-dom';
import { stairs } from '../assets/images';

const StageImage: React.FC = () => (
  <img
    src={stairs}
    alt="Stage"
    className="w-full h-full object-cover rounded-xl shadow-lg"
    style={{ aspectRatio: '16/9' }}
  />
);

const TakeNextStepSection: React.FC = () => (
  <section className="w-full bg-black py-12 md:py-20 lg:py-32">
    <div className="max-w-7xl mx-auto px-2 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side - Text and CTA */}
        <div className="text-white space-y-6 md:space-y-8 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Take the next step.
          </h2>
          <p className="text-lg md:text-2xl leading-relaxed text-gray-200 max-w-lg mx-auto lg:mx-0">
          Whether you're just starting your career journey or are an experienced professional, we're here to help you take your next career step.
          </p>
          <div className="pt-2 md:pt-4">
            <Link 
              to="/next-steps" 
              className="inline-block bg-white hover:bg-red-500 hover:text-white text-black font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-all duration-200 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
        {/* Right Side - Stage Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-xs sm:max-w-lg h-48 sm:h-64 md:h-80 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
            <StageImage />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TakeNextStepSection;
