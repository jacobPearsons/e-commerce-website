import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { job, about, people, team } from '../assets/images';
import QuoteBanner from '../components/QuoteBanner';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import ProcessCard from '../components/ProcessCard';

// FAQ data
const faqs = [
  {
    question: 'What are the benefits of using PathMatch for job search?',
    answer:
      'Using PathMatch for job search can provide you access to a larger network of job opportunities, career advice, and guidance on improving your resume and cover letter.',
  },
  {
    question: 'Does PathMatch offer internships for college students?',
    answer:
      'Yes, we offer internships for college students in various industries to help them gain valuable work experience and build their professional network.',
  },
  {
    question: 'How long does it take for PathMatch to respond to job applications?',
    answer:
      'We typically respond to job applications within 2-3 business days and will notify you if you are selected for an interview.',
  },
];

// Reusable StatCard component
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="text-yellow-400 text-4xl mb-2">{icon}</div>
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-white text-base opacity-80 text-center">{label}</div>
    </div>
  );
}

const Home = () => {
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

  const processSteps = [
    {
      stepNumber: "01",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Discovery & Analysis",
      description: "We dive deep into understanding your needs, company culture, and specific requirements.",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      stepNumber: "02",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" />
        </svg>
      ),
      title: "Talent Sourcing",
      description: "Using our extensive network and advanced tools, we identify the best candidates for your role.",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      stepNumber: "03",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Screening & Selection",
      description: "Rigorous vetting process including skills assessment, cultural fit evaluation, and interviews.",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      stepNumber: "04",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      title: "Perfect Match",
      description: "We facilitate the connection and support both parties through the entire placement process.",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
        {/* Background image */}
        <img
          src={people}
          alt="People background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-red-900 bg-opacity-80 z-10" />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center leading-tight mb-6">
            Connect Top <span className="text-red-400">Talent</span> with<br className="hidden md:block" /> Leading Companies
          </h1>
          <p className="text-lg md:text-2xl text-white text-center max-w-2xl mb-8">
            We bridge the gap between exceptional professionals and innovative organizations. Your next career opportunity or perfect hire is just one connection away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link
          to="/job-seekers"
              className="bg-red-400 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-lg shadow transition-colors text-lg flex items-center justify-center"
            >
              Find Your Dream Job <span className="ml-2">→</span>
            </Link>
            <Link
              to="/auth"
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-red-700 font-bold px-8 py-4 rounded-lg shadow transition-colors text-lg flex items-center justify-center"
            >
              Hire Top Talent
        </Link>
          </div>
          {/* Stats Row */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8 w-full max-w-3xl justify-center">
            <StatCard
              icon={<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" /></svg>}
              value="5,000+"
              label="Candidates Placed"
            />
            <StatCard
              icon={<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4a1 1 0 01-1 1h-3m-4 4v4m0 0H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2h-5z" /></svg>}
              value="500+"
              label="Partner Companies"
            />
            <StatCard
              icon={<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4H7m4 0h-1v4h-1m4 0h-1v4h-1m-4 0h-1v-4H7" /></svg>}
              value="95%"
              label="Success Rate"
            />
      </div>
        </div>
      </section>

      {/* Trusted Partner Section */}
      <section className="w-full bg-[#f7f9fb] py-20 px-4 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Your Trusted Partner in <span className="text-red-600">Career Success</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            With over a decade of experience in the recruitment industry, we've built our reputation on one simple principle: connecting the right people with the right opportunities. Our dedicated team of recruitment specialists understands that every career move is personal, and every hire is critical to business success.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We don't just fill positions – we build lasting relationships. Our comprehensive approach combines deep industry knowledge, cutting-edge technology, and genuine care for both candidates and clients.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>15+ years of industry expertise</li>
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Global network of top professionals</li>
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Proven track record of success</li>
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Personalized approach to every placement</li>
          </ul>
          <Link to="/about-us" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-colors text-base">
            Learn More About Us <span className="ml-2">→</span>
          </Link>
        </div>
        {/* Right: Image with floating card */}
        <div className="flex-1 flex items-center justify-center relative max-w-xl w-full">
          <img src={team} alt="Our Team" className="rounded-3xl shadow-xl w-full h-auto object-cover" style={{maxHeight: 380}} />
          {/* Floating card */}
          <div className="absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center border border-gray-100" style={{minWidth: 180}}>
            <span className="text-3xl font-extrabold text-red-600 mb-1">98%</span>
            <span className="text-gray-700 text-base font-medium">Client Satisfaction</span>
          </div>
        </div>
      </section>


      {/* Our Comprehensive Services Section */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Our Comprehensive Services
            </h2>
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
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg">
              Explore All Services <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Our Proven Process Section */}
      <section className="relative w-full py-20 px-4">
        {/* Team photo background with red overlay */}
        <img
          src={team}
          alt="Team background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-red-900 bg-opacity-80 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Our Proven Process
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              From initial consultation to successful placement, we follow a structured approach that ensures the best outcomes for both candidates and employers.
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <ProcessCard
                  stepNumber={step.stepNumber}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  iconBgColor={step.iconBgColor}
                  iconColor={step.iconColor}
                />
                {/* Arrow between cards (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
        </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-lg text-gray-100 mb-8">
              Ready to experience our personalized approach?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg">
                Start Your Journey <span className="ml-2">→</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg border-2 border-gray-200 hover:border-red-300">
                Learn More
              </button>
        </div>
      </div>
        </div>
      </section>

      
        <QuoteBanner />
        <section className="w-full bg-red-800 py-12 px-4 flex flex-col items-center">
        <form
          className="w-full max-w-4xl flex flex-col items-center mb-4"
          onSubmit={e => { e.preventDefault(); }}
        >
          <label htmlFor="newsletter-email" className="text-white text-xl font-medium mb-2 w-full text-left">
            Subscribe
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Email"
              className="w-full bg-white text-red-600 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-400 mb-4"
            autoComplete="email"
          />
          <button
            type="submit"
            className="w-full bg-gray-100 text-black font-semibold px-9 py-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            SIGN UP
          </button>
        </form>
        <p className="text-gray-300 text-sm text-center mt-2">Get 10% off your first purchase when you sign up for our newsletter!</p>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default Home 