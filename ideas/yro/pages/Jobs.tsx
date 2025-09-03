import React from 'react';
import ServiceCard from '../components/ServiceCard';

const Jobs = () => {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Executive Search",
      description: "Finding C-level executives and senior management professionals for leadership roles.",
      features: ["Executive headhunting", "Leadership assessment", "Succession planning"],
      learnMoreLink: "/services/executive-search"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" />
        </svg>
      ),
      title: "Permanent Placement",
      description: "Full-time permanent positions across all industries and experience levels.",
      features: ["Skills matching", "Cultural fit assessment", "Career guidance"],
      learnMoreLink: "/services/permanent-placement"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Corporate Solutions",
      description: "Comprehensive recruitment solutions for businesses of all sizes.",
      features: ["Volume recruitment", "Onboarding support", "Retention strategies"],
      learnMoreLink: "/services/corporate-solutions"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Market Intelligence",
      description: "Data-driven insights into salary trends, market conditions, and talent availability.",
      features: ["Salary benchmarking", "Market analysis", "Talent mapping"],
      learnMoreLink: "/services/market-intelligence"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: "Contract Staffing",
      description: "Flexible staffing solutions for project-based and temporary assignments.",
      features: ["Project staffing", "Interim management", "Flexible contracts"],
      learnMoreLink: "/services/contract-staffing"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      ),
      title: "Career Consulting",
      description: "Professional career development and coaching services for job seekers.",
      features: ["Resume optimization", "Interview coaching", "Career planning"],
      learnMoreLink: "/services/career-consulting"
    }
  ];

    return (
    <div className="min-h-screen bg-[#f7f9fb] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Comprehensive Services
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From executive search to career consulting, we provide end-to-end recruitment solutions tailored to your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              learnMoreLink={service.learnMoreLink}
            />
          ))}
        </div>

        {/* Explore All Services Button */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg">
            Explore All Services <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;