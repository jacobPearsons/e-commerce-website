import React, { useState } from 'react';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {objectives.map((obj, idx) => {
        const [main, bold] = obj.description.split('||');
        const isOpen = openIndex === idx;
        return (
          <div
            key={obj.title}
            className="rounded-2xl bg-[#393939] text-white overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between px-8 py-6 font-extrabold text-lg md:text-xl text-left focus:outline-none"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span className="text-left font-extrabold text-lg md:text-xl">{obj.title}</span>
              <span className="ml-4 text-2xl font-bold flex items-center justify-center">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && obj.description && (
              <div className="px-8 pb-6 text-base text-white animate-fade-in space-y-2">
                {main.split(/\n/).map((line, i) => (
                  <p key={i}>{line.trim()}</p>
                ))}
                {bold && <p className="font-bold">{bold}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 