import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { inHim, inHimm } from '../assets/images';
import Footer from '../components/Footer';

const Sermons: React.FC = () => {
  const [selectedSermon, setSelectedSermon] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sermons = [
    {
      id: 'in-him',
      title: 'IN HIM',
      preacher: 'Pastor David Ibukun',
      date: 'December 08, 2024',
      thumbnail: inHimm,
      videoUrl: inHim, // Using the inHim video/image for now
      description: 'A powerful message about our identity and position in Christ.',
      duration: '01:04'
    },
    {
      id: 'at-the-movies',
      title: 'At the Movies',
      preacher: 'Travis Jones',
      date: 'Jul 13, 2025',
      thumbnail: inHim, // Using inHim as placeholder
      videoUrl: inHim, // Using inHim as placeholder
      description: 'Finding God\'s message in popular culture and media.',
      duration: '38:15'
    },
    {
      id: 'walking-in-faith',
      title: 'Walking in Faith',
      preacher: 'Pastor Sarah Johnson',
      date: 'Jul 6, 2025',
      thumbnail: inHim, // Using inHim as placeholder
      videoUrl: inHim, // Using inHim as placeholder
      description: 'Practical steps to live a life of faith in everyday situations.',
      duration: '42:18'
    }
  ];

  const handleSermonClick = (sermonId: string) => {
    setSelectedSermon(sermonId);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedSermon(null);
  };

  const selectedSermonData = sermons.find(sermon => sermon.id === selectedSermon);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 px-2 pt-24 sm:px-4 py-12 md:py-24 bg-gradient-to-br from-blue-900 to-red-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
            Sermons
          </h1>
          <p className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Watch and listen to powerful messages that will inspire, encourage, and transform your life through the Word of God.
          </p>
        </div>
      </section>

      {/* Featured Sermon */}
      <section className="px-2 sm:px-4 py-12 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-8 md:mb-12 text-center">
            Featured Sermon
          </h2>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative aspect-video bg-black">
              <img 
                src={inHimm} 
                alt="IN HIM Sermon" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link
                  to="/sermons/in-him"
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black font-bold py-4 px-8 rounded-full flex items-center space-x-3 transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-lg">Watch Full Sermon</span>
                </Link>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">IN HIM</h3>
              <p className="text-gray-600 mb-4">Pastor David Ibukun • Dec 08, 2024 • 01:04</p>
              <p className="text-gray-700 leading-relaxed">
                A powerful message about our identity and position in Christ. Discover what it means to be "in Him" and how this truth transforms every aspect of our lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Sermons Grid */}
      <section className="px-2 sm:px-4 py-12 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-8 md:mb-12 text-center">
            All Sermons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sermons.map((sermon) => (
              <motion.div
                key={sermon.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-video bg-gray-200">
                  <img 
                    src={sermon.thumbnail} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <Link
                      to={`/sermons/${sermon.id}`}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black font-bold py-3 px-6 rounded-full flex items-center space-x-2 transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Watch</span>
                    </Link>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {sermon.duration}
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2">{sermon.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{sermon.preacher} • {sermon.date}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{sermon.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sermons; 