import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {  home, videoSrc1, outburst,worship2, word, pastor1 } from '../assets/images'
import { EventCard, EventCardData } from '../components/EventCard';
import { EventUploadForm } from '../components/EventUploadForm';
import TakeNextStepSection from '../components/TakeNextStepSection';
import Footer from "../components/Footer"


export default function Home() {
  // Listen for banner state from window (set by AnimatedLogo)
  const [bannerActive, setBannerActive] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [events, setEvents] = useState<EventCardData[]>([
    {
      date: '2025-08-04',
      title: 'Thanksgiving Sunday',
      location: 'New Creature in Christ Church',
      image: worship2,
    },
    {
      date: '2025-08-30',
      title: 'Worship Concert (Outburst 4.0)',
      location: 'New Creature in Christ Church',
      image: outburst,
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
      <div className="w-full pt-20 md:pt-24 mt-2 bg-black border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between px-2 sm:px-6 py-2 text-xs md:text-sm font-bold tracking-widest uppercase text-white" style={{letterSpacing: '0.15em'}}>
        <span>SUNDAYS | 9:00AM - 11:00AM</span>
        <a
          href="https://www.google.com/maps/search/?api=1&query=New+Creature+in+Christ+Church"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-white hover:text-green-400 transition-colors mt-2 sm:mt-0"
        >
          DIRECTIONS
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{marginTop: '-2px'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 7h-6m6 0v6" />
          </svg>
        </a>
      </div>
      {/* Hero Section (white background, grid) */}
      <section className="w-full bg-white py-12 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-2 sm:px-4">
          {/* Left: Text and Buttons */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <span className="uppercase text-xs md:text-sm tracking-widest text-black font-bold mb-2">New Creature in Christ Church</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black mb-2">Join Us on Sundays</h1>
            <p className="text-base md:text-xl text-zinc-700 mb-6">We are a diverse, life-giving church in Baruwa, Ipaja, Lagos.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-start md:justify-end">
              <Link to="/new-here" className="bg-zinc-800 hover:bg-zinc-900 text-white font-bold px-8 py-4 rounded-full shadow text-lg transition-all duration-200 hover:scale-105">New Here?</Link>
              <Link to="/sermons" className="bg-white border-2 border-zinc-700 text-zinc-900 font-bold px-8 py-4 rounded-full shadow text-lg transition-all duration-200 hover:bg-zinc-50 hover:scale-105">Latest Sermon</Link>
            </div>
          </div>
          {/* Right: Image Carousel */}
          {(() => {
            const images = [home, pastor1, word];
            const [carouselIndex, setCarouselIndex] = React.useState(0);
            const [direction, setDirection] = React.useState(1); // 1 for right, -1 for left
            const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

            const goPrev = () => {
              setDirection(-1);
              setCarouselIndex((i) => (i === 0 ? images.length - 1 : i - 1));
              resetTimeout();
            };
            const goNext = () => {
              setDirection(1);
              setCarouselIndex((i) => (i === images.length - 1 ? 0 : i + 1));
              resetTimeout();
            };

            function resetTimeout() {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => {
                setDirection(1);
                setCarouselIndex((i) => (i === images.length - 1 ? 0 : i + 1));
              }, 4000);
            }

            React.useEffect(() => {
              resetTimeout();
              return () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              };
            }, [carouselIndex]);

            const variants = {
              enter: (dir) => ({
                x: dir > 0 ? 300 : -300,
                opacity: 0,
              }),
              center: {
                x: 0,
                opacity: 1,
              },
              exit: (dir) => ({
                x: dir > 0 ? -300 : 300,
                opacity: 0,
              }),
            };

            return (
              <div className="relative flex justify-center md:justify-end w-full">
                <div className="w-full max-w-xs sm:max-w-xl aspect-[16/9] rounded-3xl shadow-lg overflow-hidden relative">
                  <AnimatePresence custom={direction} initial={false} mode="wait">
                    <motion.img
                      key={carouselIndex}
                      src={images[carouselIndex]}
                      alt="Church gathering"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, type: 'tween' }}
                      className="absolute w-full h-full object-cover"
                      style={{ borderRadius: '1.5rem' }}
                    />
                  </AnimatePresence>
                  {/* Navigation Arrows */}
                  <div className="absolute flex gap-2 md:flex-col md:gap-3 right-2 bottom-2 md:top-1/2 md:bottom-auto md:right-4 md:-translate-y-1/2 z-10">
                    <button onClick={goPrev} className="bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button onClick={goNext} className="bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  {/* Carousel Indicators */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2 z-10">
                    {images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                          idx === carouselIndex ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
          </div>
            );
          })()}
        </div>
      </section>
      {/* Mission Statement Section */}
      <section className="w-full bg-white pt-8 pb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold text-zinc-900 leading-tight mb-6">
            Love God.<br />
            Love People.<br />
            Change the World.
          </h2>
        </div>
      </section>
      {/* Video Box Section */}
      <section className="w-full bg-white pb-12">
        <div className="max-w-7xl mx-auto flex justify-center px-2 md:px-6">
          <div className="w-full max-w-3xl flex flex-col items-center">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-black aspect-video flex items-center justify-center mx-auto">
              <video src={videoSrc1} autoPlay muted loop className="w-full h-full object-contain" />
            </div>
            <Link to="/get-involved" className="mt-6 bg-zinc-700 hover:bg-zinc-800 text-white font-bold px-6 py-3 rounded shadow text-base transition-all duration-200 hover:scale-105">Get Involved</Link>
          </div>
        </div>
      </section>
      {/* Who We Are Section with Carousel */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="text-left space-y-8">
            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight text-center md:text-left">
              Who We Are
            </h2>
            {/* Description */}
            <p className="text-base md:text-xl text-black leading-relaxed max-w-2xl mx-auto md:mx-0 text-center md:text-left">
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
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Link 
                to="/about" 
                className="bg-[#005684] hover:bg-[#004a73] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-all duration-200 hover:scale-105"
              >
                About Us
              </Link>
              <Link 
                to="/our-beliefs" 
                className="bg-[#333333] hover:bg-[#222222] text-white font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-all duration-200 hover:scale-105"
              >
                Our Beliefs
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Upcoming Events Section */}
      <section className="w-full bg-[#f4f5f7] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="text-2xl md:text-5xl font-extrabold text-zinc-900 mb-8 text-center md:text-left">Events Lineup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow text-base transition-all duration-200 hover:scale-105"
            >
              Add Event
            </button>
            <Link to="/events" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded shadow text-base transition-all duration-200 hover:scale-105">All Events</Link>
          </div>
        </div>
      </section>
      {showUploadForm && (
        <EventUploadForm
          onSubmit={handleAddEvent}
          onCancel={handleCancelUpload}
        />
      )}
      <TakeNextStepSection />
      {/* Footer */}
      <Footer />
    </>
  );
} 