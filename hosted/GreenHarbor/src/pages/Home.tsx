import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {  logowide, home, videoSrc, outburst,worship2 } from '../assets/images'
import { EventCard, EventCardData } from '../components/EventCard';
import { EventUploadForm } from '../components/EventUploadForm';

const approachSteps = [
  { title: 'Discovery', description: 'Custom risk assessment' },
  { title: 'Strategy', description: 'Portfolio modeling with Monte Carlo simulations' },
  { title: 'Execution', description: 'Direct access to green bonds/private equity' },
  { title: 'Stewardship', description: 'Continuous impact monitoring' },
];

export default function Home() {
  // Listen for banner state from window (set by AnimatedLogo)
  const [bannerActive, setBannerActive] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [events, setEvents] = useState<EventCardData[]>([
    {
      date: '2025-08-30',
      title: 'Worship Concert (Outburst 4.0)',
      location: 'New Creature in Christ Church',
      image: outburst,
    },
    {
      date: '2025-08-26',
      title: 'Youth Sunday',
      location: 'New Creature in Christ Church',
      image: worship2,
    },
    {
      date: '2025-12-26',
      title: 'Love Campaign (Outreach to the less privileged)',
      location: 'New Creature in Christ Church',
      image: '/events/back-to-school.jpg',
    },
  ]);

  useEffect(() => {
    function handleBannerEvent(e) {
      setBannerActive(e.detail === true);
    }
    window.addEventListener('maintenance-banner', handleBannerEvent);
    return () => window.removeEventListener('maintenance-banner', handleBannerEvent);
  }, []);

  const handleAddEvent = (newEvent: EventCardData) => {
    setEvents(prev => [...prev, newEvent]);
    setShowUploadForm(false);
  };

  const handleCancelUpload = () => {
    setShowUploadForm(false);
  };

  return (
    <>
      {/* Service Info Bar */}
      <div className="w-full pt-24 mt-2 bg-black border-b border-zinc-800 flex items-center justify-between px-6 py-2 text-xs font-bold tracking-widest uppercase text-white" style={{letterSpacing: '0.15em'}}>
        <span>SUNDAYS | 9:00AM - 11:00AM</span>
        <a
          href="https://www.google.com/maps/search/?api=1&query=New+Creature+in+Christ+Church"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white hover:text-green-400 transition-colors"
        >
          DIRECTIONS
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{marginTop: '-2px'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7h-6m6 0v6" />
          </svg>
        </a>
      </div>
      {/* Hero Section (white background, grid) */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
          {/* Left: Text and Buttons */}
          <div className="flex flex-col gap-6">
            <span className="uppercase text-xs md:text-sm tracking-widest text-black font-bold mb-2">New Creature in Christ Church</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-2">Join Us on Sundays</h1>
            <p className="text-lg md:text-xl text-zinc-700 mb-6">We are a diverse, life-giving church in Baruwa, Ipaja, Lagos.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-start md:justify-end">
              <Link to="/new-here" className="bg-zinc-800 hover:bg-zinc-900 text-white font-bold px-8 py-4 rounded-full shadow text-lg transition-colors">New Here?</Link>
              <Link to="/sermons/latest" className="bg-white border-2 border-zinc-700 text-zinc-900 font-bold px-8 py-4 rounded-full shadow text-lg transition-colors hover:bg-zinc-50">Latest Sermon</Link>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <img src={home} alt="Church gathering" className="rounded-3xl shadow-lg w-full max-w-xl object-cover" style={{aspectRatio: '16/9'}} />
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="w-full bg-white pt-8 pb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 leading-tight mb-6">
            Love God.<br />
            Love People.<br />
            Change the World.
          </h2>
        </div>
      </section>

      {/* Video Box Section */}
      <section className="w-full bg-white pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-12 px-2 md:px-6">
          <div className="col-span-12 md:col-start-3 md:col-span-8 flex flex-col items-center">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video flex items-center justify-center">
              {/* Video placeholder: replace with <video> or embed as needed */}
              <video src={videoSrc} autoPlay muted loop className="w-full h-[100%] object-contain" />
            </div>
            <Link to="/get-involved" className="mt-6 bg-zinc-700 hover:bg-zinc-800 text-white font-bold px-6 py-3 rounded shadow text-base transition-colors">Get Involved</Link>
          </div>
        </div>
      </section>

      {/* Who We Are Section with Carousel */}
      <section className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-left space-y-8">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              Who We Are
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-black leading-relaxed max-w-2xl">
              We want to see people love God, reconciling the world to Himself.
            </p>
            
            {/* Carousel Section */}
            {(() => {
              const slides = [
                {
                  heading: 'Watchword for 2025',
                  content: (
                    <>
                      <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                        "I will bless the Lord at all times, His praise shall continually be in my mouth"
                      </p>
                      <p className="text-sm text-gray-600 font-semibold mt-2">Psalm 34:1</p>
                    </>
                  ),
                },
                {
                  heading: 'Year 2025',
                  content: (
                    <>
                      <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                        2025 is <span className="font-bold text-blue-700">“Our Year of Divine Turn Around.”</span>
                      </p>
                    </>
                  ),
                },
              ];
              const [carouselIndex, setCarouselIndex] = React.useState(0);
              const [direction, setDirection] = React.useState(1); // 1 for right, -1 for left
              const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

              const goPrev = () => {
                setDirection(-1);
                setCarouselIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
                resetTimeout();
              };
              const goNext = () => {
                setDirection(1);
                setCarouselIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
                resetTimeout();
              };

              function resetTimeout() {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                  setDirection(1);
                  setCarouselIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
                }, 4000);
              }

              React.useEffect(() => {
                resetTimeout();
                return () => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                };
              }, [carouselIndex]);

              const variants = {
                enter: (dir: number) => ({
                  x: dir > 0 ? 300 : -300,
                  opacity: 0,
                  // position: 'absolute', // REMOVE THIS LINE
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  // position: 'relative', // REMOVE THIS LINE
                },
                exit: (dir: number) => ({
                  x: dir > 0 ? -300 : 300,
                  opacity: 0,
                  // position: 'absolute', // REMOVE THIS LINE
                }),
              };
              return (
                <div className="relative overflow-hidden bg-gray-50 rounded-xl p-8 md:p-12 min-h-[180px]">
                  <div className="flex items-center justify-between">
                    {/* Left: Watchword Content with Animation */}
                    <div className="flex-1 space-y-4 relative min-h-[100px]">
                      <AnimatePresence custom={direction} initial={false} mode="wait">
                        <motion.div
                          key={carouselIndex}
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5, type: 'tween' }}
                          className="absolute w-full"
                        >
                          <h3 className="text-2xl md:text-3xl font-bold text-black">
                            {slides[carouselIndex].heading}
                          </h3>
                          {slides[carouselIndex].content}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* Right: Navigation Arrows */}
                    <div className="flex gap-3 ml-8">
                      <button onClick={goPrev} className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button onClick={goNext} className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Carousel Indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {slides.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          idx === carouselIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              );
            })()}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/about-us" 
                className="bg-[#005684] hover:bg-[#004a73] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-colors duration-200"
              >
                About Us
              </Link>
              <Link 
                to="/our-beliefs" 
                className="bg-[#333333] hover:bg-[#222222] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-colors duration-200"
              >
                Our Beliefs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full bg-[#f4f5f7] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-8">Events Lineup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow text-base transition-colors"
            >
              Add Event
            </button>
            <Link to="/events" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded shadow text-base transition-colors">All Events</Link>
          </div>
        </div>
      </section>

      {showUploadForm && (
        <EventUploadForm
          onSubmit={handleAddEvent}
          onCancel={handleCancelUpload}
        />
      )}

      {/* Take the Next Step Section */}
      <section className="w-full bg-black py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text and CTA */}
            <div className="text-white space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Take the next step.
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-200 max-w-lg">
                Whether you're new to faith or have been following Jesus for years, we want to help you take your next step.
              </p>
              <div className="pt-4">
                <Link 
                  to="/next-steps" 
                  className="inline-block bg-white hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Right Side - Placeholder for stage image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg h-80 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-semibold">[ Stage Image Placeholder ]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start">
            
            {/* Left Column - Church Information (Wider) */}
            <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
              {/* Logo */}
              <div className="flex items-center mb-4">
                <img src={logowide} alt="New Creature in Christ Church Logo" className="w-20 h-20 object-contain" />
              </div>
              
              {/* Church Description */}
              <p className="text-white text-lg md:text-l font-semibold leading-relaxed">
                New Creature in Christ Church is a diverse, family driven, community focused, and life giving church in Baruwa, Ipaja, Lagos.
              </p>
              
              {/* Street Address */}
              <div className="space-y-1">
                <h3 className="text-white font-bold text-lg mb-2">Find Us</h3>
                <div className="rounded-lg overflow-hidden border border-gray-800">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4183396894673!2d3.2619281999999994!3d6.5948153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9076993b314b%3A0x347e767319b7e6da!2s15%20New%20Creature%20Church%20St%2C%20Idimu%2C%20Lagos%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1753706846020!5m2!1sen!2sng"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="New Creature in Christ Church Map"
                  ></iframe>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="mailto:info@newcreaturechurch.com" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right Columns - Reduced Elements and Spacing */}
            <div className="col-span-1 space-y-4">
              <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-white hover:text-gray-300 transition-colors">About</a></li>
                <li><a href="/new-here" className="text-white hover:text-gray-300 transition-colors">New Here?</a></li>
                <li><a href="/events" className="text-white hover:text-gray-300 transition-colors">Events</a></li>
                <li><a href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="col-span-1 space-y-4">
              <h3 className="text-white font-bold text-lg mb-2">Connect</h3>
              <ul className="space-y-2">
                <li><a href="/get-involved" className="text-white hover:text-gray-300 transition-colors">Get Involved</a></li>
                <li><a href="/give" className="text-white hover:text-gray-300 transition-colors">Give</a></li>
                <li><a href="/sermons" className="text-white hover:text-gray-300 transition-colors">Sermons</a></li>
              </ul>
            </div>
            <div className="col-span-1 space-y-4">
              <h3 className="text-white font-bold text-lg mb-2">Media</h3>
              <ul className="space-y-2">
                <li><a href="/church-online" className="text-white hover:text-gray-300 transition-colors">Church Online</a></li>
                <li><a href="/motivation-kids" className="text-white hover:text-gray-300 transition-colors">Motivation Kids</a></li>
              </ul>
            </div>
          </div>
          
          {/* Copyright Section */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm text-center md:text-left">
                Copyright © 2025 New Creature in Christ Church - All Rights Reserved.
              </p>
              <div className="flex gap-6 text-gray-400 text-sm mt-4 md:mt-0">
                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 