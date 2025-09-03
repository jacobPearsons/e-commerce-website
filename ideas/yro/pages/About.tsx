import React from 'react';
import { skyscraper, people1 } from '../assets/images'
import { ObjectivesAccordion } from '../components/ObjectivesAccordion';
import TakeNextStepSection from '../components/TakeNextStepSection';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto  px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              About PathMatch
            </h2>
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed max-w-2xl mx-auto md:mx-0">
              PathMatch Employment Agency was established with a clear vision: to bridge the gap between talented professionals and forward-thinking companies. We specialize in connecting job seekers with their ideal career opportunities while helping employers find the perfect candidates to drive their business success.
            </p>
          </div>
          {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <img src={skyscraper} alt="About PathMatch Employment Agency" className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md object-cover border border-gray-200 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '4/5' }} />
          </div>
        </div>
      </section>
      
      {/* Narrative Section (Inverted) */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Text with Border - show first on mobile */}
          <div className="w-full md:w-1/2 order-1 md:order-1 flex justify-center md:justify-end">
            <div className="border border-gray-300 rounded-2xl bg-gray-50 p-6 md:p-12 shadow-md w-full text-center">
              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
                Our mission is to create meaningful connections that transform careers and businesses. We believe that every individual deserves to find work that not only pays the bills but fulfills their professional aspirations and personal growth.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mt-4 md:mt-6">
                With years of experience in recruitment and talent acquisition, our team understands the unique challenges both job seekers and employers face in today's competitive market. We leverage our expertise, industry connections, and innovative technology to deliver exceptional results for all our clients.
              </p>
            </div>
          </div>
          {/* Image - show after text on mobile */}
          <div className="flex justify-center md:justify-start w-full md:w-1/2 order-2 md:order-2">
            <img src={people1} alt="PathMatch Team" className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md object-cover border border-gray-200 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '5/4' }} />
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="w-full bg-white py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 md:mb-6">Our Mission</h2>
          <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed">
            To empower individuals and organizations through strategic talent solutions, creating lasting partnerships that drive career success and business growth in an ever-evolving job market.
          </p>
        </div>
      </section>
      
      {/* Objectives Accordion Section */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <ObjectivesAccordion />
        </div>
      </section>
      
      <TakeNextStepSection />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;