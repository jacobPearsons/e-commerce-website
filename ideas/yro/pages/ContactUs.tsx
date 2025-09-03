import React, { useState } from 'react';
import Footer from '../components/Footer';
import { FiMail, FiMapPin, FiPhone, FiClock, FiUser } from 'react-icons/fi';

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full max-w-none px-0 pt-6 md:pt-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Have questions? We're here to help. Get in touch with our team today.
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <FiMail size={28} className="text-red-600" />
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition resize-y"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4" />
                          <path d="M4 12a8 8 0 018-8" strokeWidth="4" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiMail className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                      <FiMapPin size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        EL Mirage, Arizona 85335<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                      <FiPhone size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600">
                        +1 (407) 666-0702<br />
                        Mon-Fri 9AM-6PM PST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                      <FiMail size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">
                        info@pathmatch.com<br />
                        support@pathmatch.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                      <FiClock size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Contacts</h2>
                
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FiUser size={20} className="text-red-600" />
                      <h3 className="font-semibold text-gray-800">General Inquiries</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">Questions about our services and general support</p>
                    <a href="mailto:info@pathmatch.com" className="text-red-600 hover:underline text-sm">info@pathmatch.com</a>
                  </div>

                  <div className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FiUser size={20} className="text-red-600" />
                      <h3 className="font-semibold text-gray-800">Enterprise Sales</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">Custom solutions for large organizations</p>
                    <a href="mailto:sales@pathmatch.com" className="text-red-600 hover:underline text-sm">sales@pathmatch.com</a>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <FiUser size={20} className="text-red-600" />
                      <h3 className="font-semibold text-gray-800">Tech Support</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">Technical issues and application support</p>
                    <a href="mailto:support@pathmatch.com" className="text-red-600 hover:underline text-sm">support@pathmatch.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of companies and candidates who trust PathMatch for their recruitment needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-300">
                Start Your Free Trial
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-300">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;