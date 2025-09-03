import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BackgroundPaths from '../../components/BackgroundPaths'
import { job, about } from '../../assets/images';
import QuoteBanner from '../../components/QuoteBanner';
import React, { useState } from 'react';
import Footer from '../../components/Footer';

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

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Paths */}
      <BackgroundPaths title="Find Your Ideal Job" />
      {/* Intro Section */}
      <div className="flex flex-col items-center justify-center text-center bg-black text-white rounded-xl px-4 py-12 mb-16 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Your Journey Starts Here</h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-300 mb-8">
          Welcome to PathMatch, where we revolutionize the job search and hiring experience. Founded on the belief that meaningful connections change lives, we specialize in uniting top-tier professionals with visionary companies. Unlike traditional job boards, PathMatch uses intelligent matching to cut through the noise – because your skills deserve to be seen, and your business deserves the right talent.
        </p>
        <Link
          to="/job-seekers"
          className="bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-md shadow hover:bg-gray-200 transition-colors"
        >
          FIND OUT MORE
        </Link>

      </div>
      {/* Image/Text Section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center bg-black rounded-xl overflow-hidden mb-16 shadow-lg">
        <div className="w-full lg:w-1/2 h-64 lg:h-auto flex-shrink-0">
          <img src={job} alt="Job search" className="object-cover w-full h-full" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Welcome to PathMatch Employment Agency</h2>
          <p className="text-gray-300 text-lg md:text-xl mb-2">
            Discover your dream job with PathMatch. We specialize in remote, work-from-home positions across various industries. Join us to explore flexible job opportunities that suit your lifestyle and career goals. Your future starts here!
          </p>
        </div>
      </div>
      {/* About Section */}
      <div className="w-full flex flex-col items-center justify-center bg-gray-100 rounded-xl py-16 px-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-black text-center mb-10 tracking-tight">ABOUT PATHMATCH EMPLOYMENT</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
          <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-white shadow-lg">
            <img src={about} alt="About PathMatch" className="object-cover w-full h-full" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-800 text-2xl md:text-xl text-center md:text-left max-w-xl">
              Welcome to PathMatch Employment, where we are dedicated to transforming the job search and hiring experience. Discover roles that align with your expertise and values. Our platform analyzes your skills, preferences, and goals to explore opportunities where you’ll thrive – not just work.
            </p>
          </div>
        </div>
      </div>
      {/* Opportunity Section */}
      <section className="w-full bg-black py-16 px-4 mb-16">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white text-center mb-12 tracking-tight uppercase">Find your next opportunity with PathMatch</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Explore Career Paths</h3>
            <p className="text-gray-300 text-base">Not sure where to start? Discover industries and roles that match your strengths with our interactive career guides. From tech to healthcare, we break down salaries, growth paths, and day-to-day tasks to help you choose wisely.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Build Your Skills</h3>
            <p className="text-gray-300 text-base">Future-proof your resume. Access free training programs, certifications, and skill-building resources curated by industry leaders. Whether it’s coding, project management, or design, we’ll help you level up.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Attend Virtual Job Fairs</h3>
            <p className="text-gray-300 text-base">Meet employers without leaving home. Network with top companies through our live virtual job fairs. Get face-time with recruiters, ask questions, and land interviews – all from your couch.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Get Job Search Support</h3>
            <p className="text-gray-300 text-base">Don’t navigate the job market alone. Our career coaches review resumes, prep you for tough interviews, and tailor your job-hunting strategy. Because everyone deserves a hype squad.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Find Remote Work</h3>
            <p className="text-gray-300 text-base">Work from anywhere – seriously. Browse vetted remote jobs with flexible schedules, competitive pay, and zero commute. Perfect for digital nomads or caregivers.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Join Our Talent Network</h3>
            <p className="text-gray-300 text-base">Let opportunities find you. Create a profile, and our smart matching system will notify you about relevant jobs, events, and career tips. Just sit back and watch offers roll in.</p>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <QuoteBanner />
      <div className="relative z-10 bg-black dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-16">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div 
              className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-neutral-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-blue-600 text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find flexible, remote work from home that fits your lifestyle.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-neutral-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-green-600 text-3xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Career Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access to professional development resources and mentorship opportunities
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-neutral-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-purple-600 text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Global Network</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with employers worldwide and expand your professional network
              </p>
            </motion.div>
        </div>

          {/* Call to Action */}
          <motion.div 
            className="bg-black text-white rounded-2xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="mb-8 text-blue-100">
              Join thousands of professionals who have found their dream jobs through our platform
          </p>
            <div className="space-x-4">
          <Link
                to="/employer"
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white  transition-colors inline-block"
          >
                Hire a Seeker
          </Link>
              <Link
                to="/job-seekers"
                className="bg-transparent text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors border border-white inline-block"
              >
                Explore Jobs
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      {/* FAQ Section */}
      <section className="w-full bg-neutral-900 py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 tracking-tight uppercase">Frequently Asked Questions</h2>
        <p className="text-center text-gray-300 mb-10">Please reach us at <a href="mailto:contactemail.com" className="underline hover:text-blue-400">contactemail.com</a> if you cannot find an answer to your question.</p>
        <div className="max-w-2xl mx-auto divide-y divide-neutral-700">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      <section className="w-full bg-black py-12 px-4 flex flex-col items-center">
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
            className="w-full bg-zinc-900 text-white px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 mb-4"
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

// FAQ Item component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-white focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="ml-4 text-2xl text-gray-400">{open ? '\u25B2' : '\u25BC'}</span>
      </button>
      <div
        className={`mt-3 text-gray-300 text-base transition-all duration-300 ease-in-out ${open ? 'block' : 'hidden'}`}
      >
        {answer}
      </div>
    </div>
  );
}

export default Home 