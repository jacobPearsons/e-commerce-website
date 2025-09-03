import React from 'react';

interface ProcessCardProps {
  stepNumber: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  stepNumber,
  icon,
  title,
  description,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className={`${iconBgColor} rounded-full p-4 w-16 h-16 flex items-center justify-center`}>
          <div className={`${iconColor} text-2xl`}>
            {icon}
          </div>
        </div>
      </div>
      
      {/* Step Number */}
      <div className="text-center mb-4">
        <span className="text-gray-400 text-lg font-semibold">{stepNumber}</span>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-600 text-center text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default ProcessCard; 