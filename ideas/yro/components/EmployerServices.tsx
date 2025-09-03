import React from 'react';
import employerServices from '../assets/data/employerServices';
import { Service, GetStartedStep } from '../types/serviceTypes';

const EmployerServices: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {employerServices.header}
          </h1>
          <p className="text-xl text-zinc-700 max-w-3xl mx-auto">
            {employerServices.subheader}
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {employerServices.services.map((service: Service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Get Started Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Get Started with PathMatch
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employerServices.getStartedSteps.map((step: GetStartedStep) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <p className="text-2xl italic text-zinc-700">
            "{employerServices.closingStatement}"
          </p>
        </div>
      </div>
    </section>
  );
};

// Sub-components with TypeScript props
interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    {service.icon && (
      <div className="text-red-600 text-3xl mb-4">
        <i className={service.icon}></i>
      </div>
    )}
    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
    <p className="text-gray-600">{service.description}</p>
  </div>
);

interface StepCardProps {
  step: GetStartedStep;
}

const StepCard: React.FC<StepCardProps> = ({ step }) => (
  <div className="border border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors">
    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
    <p className="text-gray-600 mb-4">{step.description}</p>
    <a 
      href={step.ctaLink}
      className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
    >
      {step.ctaText} &rarr;
    </a>
  </div>
);

export default EmployerServices; 