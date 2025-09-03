import React, { useState } from 'react';
import { FaDownload, FaPlay } from 'react-icons/fa';

const VideoCard = ({ videoUrl, title, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = title || 'video';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStream = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-[917px] h-[516px] ml-[30px] bg-black rounded-lg overflow-hidden">
      {/* Video Player */}
      {isPlaying ? (
        <video
          className="w-full h-full object-cover"
          src={videoUrl}
          controls
          autoPlay
        />
      ) : (
        <div 
          className="w-full h-full bg-gray-900 cursor-pointer relative group"
          onClick={handleStream}
        >
          {/* Thumbnail */}
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <FaPlay className="text-white text-2xl" />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          onClick={handleStream}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <FaPlay />
          {isPlaying ? 'Pause' : 'Stream'}
        </button>
        
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <FaDownload />
          Download
        </button>
      </div>

      {/* Video Title */}
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default VideoCard;
