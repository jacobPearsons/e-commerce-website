import React from 'react';

interface FundDataCardProps {
  title: string;
  date?: string | null;
  children: React.ReactNode;
  actionLink?: {
    text: string;
    href: string;
  };
  className?: string;
}

export default function FundDataCard({ 
  title, 
  date, 
  children, 
  actionLink, 
  className = "" 
}: FundDataCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 relative ${className}`}>
      {/* Title with pill-shaped background */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs font-semibold">
            {title}
          </span>
          {date && (
            <span className="text-green-900 text-xs">
              ({date})
            </span>
          )}
        </div>
        {actionLink && (
          <a 
            href={actionLink.href}
            className="text-green-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            {actionLink.text} →
          </a>
        )}
      </div>
      
      {/* Main content */}
      <div className="min-h-[80px] flex items-center">
        {children}
      </div>
    </div>
  );
} 