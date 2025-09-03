import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Objective {
  title: string;
  description: string;
}

const objectives: Objective[] = [
  {
    title: 'Talent Acquisition Excellence',
    description: 'To provide exceptional recruitment services that connect the right candidates with the right opportunities, ensuring successful placements that benefit both employers and job seekers.'
  },
  {
    title: 'Career Development & Growth',
    description: 'To empower individuals with career guidance, professional development resources, and strategic advice that accelerates their career progression and personal growth.'
  },
  {
    title: 'Employer Partnership & Support',
    description: 'To build lasting partnerships with employers by understanding their unique needs and providing comprehensive talent solutions that drive business success and organizational growth.'
  },
  {
    title: 'Industry Expertise & Innovation',
    description: 'To stay at the forefront of recruitment trends and technology, offering innovative solutions that adapt to the evolving job market and industry demands.'
  },
  {
    title: 'Professional Integrity & Trust',
    description: 'To maintain the highest standards of professionalism, confidentiality, and ethical practices in all our interactions with clients, candidates, and partners.'
  },
  {
    title: 'Community Impact & Economic Growth',
    description: 'To contribute to local and national economic development by facilitating employment opportunities and supporting workforce development initiatives.'
  },
];

export const ObjectivesAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {objectives.map((obj, idx) => {
        const isOpen = openIndex === idx;
        return (
          <motion.div
            key={obj.title}
            className="rounded-2xl bg-[#393939] text-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <button
              className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 font-extrabold text-base sm:text-lg md:text-xl text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#393939] rounded-t-2xl transition-colors duration-200 hover:bg-red-500"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${idx}`}
            >
              <span className="text-left font-extrabold text-base sm:text-lg md:text-xl pr-4">
                {obj.title}
              </span>
              <motion.span 
                className="ml-4 text-xl sm:text-2xl font-bold flex items-center justify-center w-8 h-8 rounded-full bg-white bg-opacity-10 flex-shrink-0"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? '−' : '+'}
              </motion.span>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${idx}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-4 md:pb-6 text-sm sm:text-base text-white space-y-3">
                    <p className="leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}; 