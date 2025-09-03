import React from 'react';

interface JobCardProps {
  title: string;
  company: string;
  jobType: string;
  location?: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  postedTime?: string;
  onApply?: () => void;
  onViewDetails?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  jobType,
  location = 'Remote',
  salaryRange,
  description,
  requiredSkills,
  postedTime = '1 day ago',
  onApply,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Header with Job Type Badge */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 pr-4">{title}</h3>
        <div className="flex flex-col items-end space-y-1">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {jobType}
          </span>
          <div className="flex items-center text-gray-500 text-xs">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {postedTime}
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        {company}
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600 text-sm mb-3">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
        </svg>
        {location}
      </div>

      {/* Salary Range */}
      <div className="flex items-center text-green-600 font-bold text-sm mb-4">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
        {salaryRange}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {description}
      </p>

      {/* Skills Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {requiredSkills.slice(0, 4).map((skill, index) => (
          <span 
            key={index} 
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onApply}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
          Apply Now
        </button>
        <button
          onClick={onViewDetails}
          className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-colors flex items-center justify-center text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard; 