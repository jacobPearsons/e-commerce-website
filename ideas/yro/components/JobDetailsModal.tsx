import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: {
    title?: string;
    company?: string;
    jobType?: string;
    location?: string;
    salaryRange?: string;
    description?: string;
    requiredSkills?: string[];
    benefits?: string[];
  };
  onApply: (jobTitle: string, companyName: string) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  job = {},
  onApply
}) => {
  // Safely get array fields with defaults
  const requiredSkills = job?.requiredSkills || [];
  const benefits = job?.benefits || [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none z-10"
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="p-8">
            {/* Header Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {job.title || "Job Title Not Available"}
              </h2>

              {/* Job Attributes */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {job.company && (
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {job.company}
                  </div>
                )}

                {job.location && (
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
                    </svg>
                    {job.location}
                  </div>
                )}

                {job.jobType && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {job.jobType}
                  </span>
                )}
              </div>

              {/* Salary Range */}
              {job.salaryRange && (
                <div className="flex items-center text-green-600 font-bold text-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {job.salaryRange}
                </div>
              )}
            </div>

            {/* Job Description Section */}
            {job.description && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Job Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            )}

            {/* Required Skills Section */}
            {requiredSkills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {requiredSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits Section */}
            {benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-gray-500 mr-2 mt-1">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Button */}
            <button
              onClick={() => onApply(job.title || "", job.company || "")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
              </svg>
              Apply for This Position
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JobDetailsModal;