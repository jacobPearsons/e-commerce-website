import React from 'react';
import { videoSrc } from '../assets/images';
import EmployerServices from '../components/EmployerServices';
import JobSeekerServices from '../components/JobSeekerServices';
import Footer from '../components/Footer';

const Employers: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-4xl mx-auto py-2 flex-1 pt-24">
        {/* Hero Section */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-500 text-center mb-4">Welcome To The Employers Section Of PathMatch!</h1>
        <p className="text-lg text-zinc-800 text-center mb-10">
          We understand that finding the right talent is crucial to the success of your organization. At PathMatch, we are dedicated to providing businesses with customized recruitment solutions that connect you with top-tier candidates who fit your unique needs.
        </p>
        <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <a
            href="/job-seekers"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
            role="button"
            tabIndex={0}
          >
            Browse Jobs
          </a>
            <a
              href="/signup"
              className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold border border-red-500 hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              role="button"
              tabIndex={0}
            >
              Create Profile
            </a>
        </div>

        {/* Video Section */}
        <div className="flex justify-center items-center w-full bg-black py-8 mb-10">
          <video
            src={videoSrc}
            controls
            className="mx-auto rounded-lg shadow-lg w-full max-w-3xl bg-black"
            poster=""
            aria-label="PathMatch Introduction Video"
          />
        </div>

        {/* Why Partner Section */}
        <h2 className="text-2xl font-bold text-black mb-4">Why Partner with PathMatch?</h2>
        <p className="text-gray-700 ml-8">
          At PathMatch, we recognize the challenges of navigating the competitive job market and the importance of building strong teams. Our tailored approach ensures that you not only find candidates with the right skills but also those who align with your company’s culture and goals. Here’s how we can support your hiring process:
        </p>

        <div className="space-y-8 mb-12">
          {/* 1. Tailored Recruitment Solutions */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">1. Tailored Recruitment Solutions</h3>
            <p className="text-gray-700">
              We don’t believe in one-size-fits-all. Our team takes the time to understand your specific hiring needs, crafting customized recruitment strategies that resonate with your organizational objectives. Whether you need to fill temporary roles or seek full-time talent, we have the solutions to meet your requirements.
            </p>
          </div>
          {/* 2. Access to a Diverse Talent Pool */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">2. Access to a Diverse Talent Pool</h3>
            <p className="text-gray-700">
              With our extensive network and broad reach, we provide access to a diverse range of candidates across various industries. We believe that diverse teams drive innovation and success, so we focus on finding talent from different backgrounds and experiences.
            </p>
          </div>
          {/* 3. Streamlined Hiring Process */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">3. Streamlined Hiring Process</h3>
            <p className="text-gray-700">
              Our expertise in recruitment allows us to manage the entire process efficiently—from sourcing candidates and conducting initial screenings to coordinating interviews and providing you with feedback. This means you can focus on what you do best: running your business.
            </p>
          </div>
          {/* 4. Comprehensive Candidate Assessments */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">4. Comprehensive Candidate Assessments</h3>
            <p className="text-gray-700">
              We utilize proven assessment tools and interview techniques to evaluate candidates thoroughly. Our detailed evaluations ensure that you receive only the most qualified individuals who meet your criteria and can contribute effectively to your team.
            </p>
          </div>
          {/* 5. Employer Branding Support */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">5. Employer Branding Support</h3>
            <p className="text-gray-700">
              At PathMatch, we understand that attracting top talent requires a strong employer brand. We work with you to enhance your job postings and showcase your company culture, values, and benefits to make your opportunities more appealing to candidates.
            </p>
          </div>
          {/* 6. Ongoing Support and Consultation */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">6. Ongoing Support and Consultation</h3>
            <p className="text-gray-700">
              Our partnership doesn’t end once the position is filled. We provide ongoing support to help you integrate new hires into your team successfully and offer consultation on workforce planning and employee engagement strategies.
            </p>
          </div>
        </div>

        {/* Get Started Section */}
        <h2 className="text-2xl font-bold text-black mb-4">Get Started</h2>
        <ul className="list-disc list-inside text-gray-700 mb-10 space-y-2">
          <li>
            <span className="font-semibold">Submit a Job Opening:</span> Fill out our easy-to-use form to post your job vacancies directly on our platform. <a href="/job-seekers" className="text-blue-600 underline hover:text-blue-800">Job Submission Form</a>
          </li>
          <li>
            <span className="font-semibold">Contact Us for a Personalized Consultation:</span> Our team is here to discuss your hiring needs and explore how we can assist you in achieving your talent acquisition goals. <a href="#contact" className="text-blue-600 underline hover:text-blue-800">Contact Us</a>
          </li>
          <li>
            <span className="font-semibold">Explore Our Success Stories:</span> Learn how we’ve helped other companies build strong teams and meet their HR challenges. <a href="#success-stories" className="text-blue-600 underline hover:text-blue-800">Success Stories</a>
          </li>
        </ul>

        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="bg-black text-white font-semibold px-10 py-3 rounded shadow hover:bg-gray-200 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {
              const form = document.getElementById('employer-form-section');
              if (form) form.scrollIntoView({ behavior: 'smooth' });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            FIND OUT MORE
          </button>
        </div>
        {/* Employer Services Section */}
        <EmployerServices />
        {/* Job Seeker Services Section */}
        <JobSeekerServices />
      </div>
      <Footer /> 
    </div>
  );
};

export default Employers; 