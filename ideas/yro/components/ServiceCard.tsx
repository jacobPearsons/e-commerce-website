import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  learnMoreLink: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  learnMoreLink,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 h-full flex flex-col border-2 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-xl">
      {/* Icon Section - Centered at top */}
      <div className="flex justify-center mb-6">
        <div className="bg-red-50 rounded-xl p-4">
          <div className="text-red-600 text-3xl">
            {icon}
          </div>
        </div>
      </div>
      {/* Title and Description */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
      </div>
      {/* Features List */}
      <div className="flex-1 mb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700 text-sm">
              <div className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {/* Learn More Button - Centered, full width, faded red rectangle */}
      <div className="mt-auto text-center">
        <a
          href={learnMoreLink}
          className="block w-full bg-red-100 text-red-600 font-semibold rounded-lg py-2 px-0 hover:bg-red-200 hover:text-red-700 transition-colors text-center"
        >
          Learn More <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard; 