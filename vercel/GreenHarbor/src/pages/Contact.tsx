import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { contact } from '../assets/images';
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isRobot: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isRobot: e.target.checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full pt-24 bg-gradient-to-br from-blue-900 to-red-900 py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Get in touch with us.
            </h1>
            <p className="text-base md:text-xl text-gray-200 max-w-3xl mx-auto">
            We'd love to hear from you and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>
      <motion.div 
            className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img 
              src={contact} 
              alt="Church Community" 
              className="w-full h-full object-cover rounded-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
          </motion.div>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            
            {/* Left Column - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Contact us
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  If you have any questions or comments, please feel free to reach out to us.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">EMAIL</p>
                    <p className="text-black">info@newcreaturechurch.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">OUR ADDRESS</p>
                    <p className="text-black">#1, New Creature Church Street Off Candos Road</p>
                    <p className="text-black">Baruwa-Ipaja, Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Visit Planning Card */}
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-gray-600 mb-2">52 people have recently planned their visit</p>
                <p className="text-gray-800 mb-4">Your first visit doesn't have to be intimidating. Let's plan ahead.</p>
                <Link
                  to="/new-here"
                  className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Plan my visit!
                </Link>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors duration-200 text-black placeholder-gray-400"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors duration-200 text-black placeholder-gray-400"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we serve you?"
                    rows={4}
                    className="w-full px-0 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors duration-200 text-black placeholder-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Robot Checkbox */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="isRobot"
                    checked={formData.isRobot}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label className="text-black text-sm">
                    Verify you aren't a robot
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
