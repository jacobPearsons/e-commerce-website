import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { inHim, inHimm } from '../assets/images';
import Footer from '../components/Footer';

const InHimSermon: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sermonData = {
    title: 'IN HIM',
    preacher: 'Pastor David Ibukun',
    date: 'December 08, 2024',
    duration: '01:04',
    description: 'A powerful message about our identity and position in Christ. Discover what it means to be "in Him" and how this truth transforms every aspect of our lives.',
    scripture: 'Acts 17:28',
    videoUrl: inHim, // Using the inHim video/image for now
    thumbnail: inHimm,
    keyPoints: [
      'Understanding our new identity in Christ',
      'The power of being "in Him"',
      'How our position affects our daily walk',
      'Practical application of this truth'
    ]
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video play failed:', error);
        // Fallback to showing the image if video fails
        setIsPlaying(false);
      });
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-2 sm:px-4 py-12 md:py-24 bg-gradient-to-br from-blue-900 to-red-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-start mb-6">
              <Link 
                to="/sermons" 
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors bg-black bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm sm:text-base">Back to Sermons</span>
              </Link>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {sermonData.title}
            </h1>
            <p className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {sermonData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="px-2 sm:px-4 py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video">
              {!isPlaying ? (
                <div className="w-full h-full relative">
                  <img 
                    src={sermonData.thumbnail} 
                    alt={sermonData.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button
                      onClick={handlePlayVideo}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black font-bold py-6 px-12 rounded-full flex items-center space-x-4 transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-xl">Play Full Sermon</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                    onEnded={handleVideoEnded}
                    onError={() => setIsPlaying(false)}
                  >
                    <source src={sermonData.videoUrl} type="video/mp4" />
                    <source src={sermonData.videoUrl} type="video/webm" />
                    <source src={sermonData.videoUrl} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Details */}
      <section className="px-2 sm:px-4 py-12 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column - Sermon Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">About This Sermon</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {sermonData.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-4">Key Scripture</h3>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <p className="text-gray-800 text-lg font-medium mb-2">{sermonData.scripture}</p>
                  <p className="text-gray-600 italic">
                    "For in Him we live and move and have our being. As some of your own poets have said, ‘ We are His offspring.'"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-4">Key Points</h3>
                <ul className="space-y-3">
                  {sermonData.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Sermon Meta */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-black mb-4">Sermon Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Preacher</span>
                    <p className="text-black font-medium">{sermonData.preacher}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Date</span>
                    <p className="text-black font-medium">{sermonData.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Duration</span>
                    <p className="text-black font-medium">{sermonData.duration}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-black mb-4">Share This Sermon</h3>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InHimSermon; 