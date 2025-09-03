import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface Category {
  id: number;
  name: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const categories: Category[] = [
    { id: 1, name: "Rick Nasty Xxx" },
    { id: 2, name: "Big Ass" },
    { id: 3, name: "Today's selection" },
    { id: 4, name: "History" },
    { id: 5, name: "Suggestions" },
    { id: 6, name: "Preview GOLD" },
    { id: 7, name: "Family" },
    { id: 8, name: "Hardcore" },
    { id: 9, name: "Milf" },
    { id: 10, name: "Nigeria" },
    { id: 11, name: "Black Girls" },
    { id: 12, name: "Missionary" },
    { id: 13, name: "Big dick" },
    { id: 14, name: "Big Tits" },
    { id: 15, name: "Pussyfucking" },
    { id: 16, name: "Lesbian" },
    { id: 17, name: "Porno" }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 p-2.5 text-white hover:text-red-500 transition-colors duration-200 bg-black/50 rounded-full"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      
      <div 
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'w-full max-w-[300px]' : 'w-64'}`}
      >
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold text-red-500">Categories</h2>
        </div>
        
        <div className="py-2">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="px-5 py-3 cursor-pointer hover:bg-gray-800 hover:text-red-500 transition-colors duration-200 text-sm"
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar; 