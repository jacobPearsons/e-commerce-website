import React from 'react';
import { events, guitar, praise, open } from '../assets/images';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';

const Events: React.FC = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Sunday Service",
      date: "Every Sunday",
      time: "9:00 AM - 11:00 AM",
      description: "Join us for our weekly Sunday service with powerful worship and inspiring messages.",
      category: "Weekly Service"
    },
    {
      id: 2,
      title: "Mid-week Bible Study",
      date: "Every Thursday",
      time: "6:00 PM - 7:30 PM",
      description: "Deep dive into God's Word with our mid-week Bible study and prayer session.",
      category: "Bible Study"
    },
    {
      id: 3,
      title: "Youth Ministry Meeting",
      date: "Every Saturday",
      time: "3:00 PM - 5:00 PM",
      description: "Empowering our youth with faith-based activities, mentorship, and community building.",
      category: "Youth"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full pt-24 bg-gradient-to-br from-blue-900 to-red-900 py-12 md:py-24">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 md:space-y-8 text-center md:text-left">
              {/* Main Heading */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Events
              </h1>
              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto md:mx-0">
                From sponteaneous worship sessions to deep spiritual growth, we have events for everyone. Join us in building a community and strengthening our faith together.
              </p>
              {/* Call-to-Action Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 font-semibold rounded-lg transition-all duration-200 text-lg hover:scale-105 shadow-lg"
                >
                  Get Involved
                </Link>
                <Link
                  to="/calendar"
                  className="px-8 py-4 bg-transparent hover:bg-white hover:text-blue-900 text-white font-semibold rounded-lg border-2 border-white transition-all duration-200 text-lg hover:scale-105"
                >
                  View Calendar
                </Link>
              </div>
            </div>
            {/* Right: Image Placeholder */}
            <motion.div 
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {(() => {
                const images = [praise, open, guitar];
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
                    <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-40 sm:h-56 md:h-72 lg:h-80 rounded-xl shadow-xl overflow-hidden relative">
                      <AnimatePresence custom={direction} initial={false} mode="wait">
                        <motion.img
                          key={carouselIndex}
                          src={images[carouselIndex]}
                          alt="Church Events"
                          custom={direction}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5, type: 'tween' }}
                          className="absolute w-full h-full object-cover"
                          style={{ borderRadius: '0.75rem' }}
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Big Image Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Join Our Community
            </h2>
            <p className="text-base md:text-lg text-zinc-700 max-w-3xl mx-auto">
              Experience the warmth and love of our church family through our various events and activities.
            </p>
          </div>
          
          {/* Big Image Container */}
          <motion.div 
            className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.img 
              src={events} 
              alt="Church Community" 
              className="w-full h-full object-cover rounded-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Upcoming Events
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Stay connected with our church community through these regular events and special gatherings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-br from-blue-900 to-red-900">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-lg md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Join our community and experience the love and fellowship of our church family. We'd love to have you at our next event!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 font-semibold rounded-lg transition-all duration-200 text-lg hover:scale-105 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/new-here"
              className="px-8 py-4 bg-transparent hover:bg-white hover:text-blue-900 text-white font-semibold rounded-lg border-2 border-white transition-all duration-200 text-lg hover:scale-105"
            >
              New Here?
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;