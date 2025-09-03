import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Objective {
  title: string;
  description: string;
}

const objectives: Objective[] = [
  {
    title: 'Unity in Faith',
    description: 'By the power of the Holy Spirit, to bring together believers in the Christian doctrine of one God.'
  },
  {
    title: 'Spiritual Growth & Discipleship',
    description: 'To teach, preach, and inspire members in the tenets of the Christian faith while ministering to their spiritual needs, development, and welfare.'
  },
  {
    title: 'Evangelism & Gospel Outreach',
    description: 'To propagate, spread, and teach the gospel of our Lord Jesus Christ to members and the world at large.'
  },
  {
    title: 'Christian Unity & Global Impact',
    description: 'To promote the unity of Christianity in Nigeria and across the world.'
  },
  {
    title: 'Moral Integrity & Ethical Leadership',
    description: 'To foster discipline and elevate moral standards among members and society.'
  },
  {
    title: 'National Development & Social Contribution',
    description: 'To actively contribute to the progress and well-being of Nigeria.'
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
              className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 font-extrabold text-base sm:text-lg md:text-xl text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#393939] rounded-t-2xl transition-colors duration-200 hover:bg-[#4a4a4a]"
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