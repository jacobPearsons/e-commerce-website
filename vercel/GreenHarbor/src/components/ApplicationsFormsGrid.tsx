import React from 'react';

interface FormButton {
  label: string;
  href?: string;
}

interface ApplicationsFormsGridProps {
  rows: FormButton[][];
}

const colClass = [
  'grid-cols-1',
  'grid-cols-2',
  'grid-cols-3',
];

export default function ApplicationsFormsGrid({ rows }: ApplicationsFormsGridProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className={`grid gap-4 ${
            row.length === 1
              ? 'grid-cols-1'
              : row.length === 2
              ? 'grid-cols-2'
              : 'grid-cols-3'
          }`}
        >
          {row.map((btn, bIdx) => (
            <a
              key={bIdx}
              href={btn.href || '#'}
              role="button"
              tabIndex={0}
              className="w-full h-[48px] flex items-center rounded-full border-2 border-white bg-transparent text-white font-bold shadow-lg transition-all duration-200 ease-in-out hover:bg-white hover:text-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 text-base md:text-lg font-sans tracking-tight cursor-pointer text-left pl-8 pr-4"
              style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)', letterSpacing: '0.01em' }}
            >
              {btn.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
} 