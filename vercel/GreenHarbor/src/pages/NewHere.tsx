import React, { useRef } from 'react';
import { wealth, joie, women, victor, pastor2 } from '../assets/images'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/Footer';

const NewHere: React.FC = () => {
  // Carousel data
  const carouselSlides = [
    {
      title: "Our Vision",
      content: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new. 2 Corinthians 5:17",
      buttonText: "Learn More",
      buttonLink: "/next-steps"
    },
    {
      title: "Mission Statement",
      content: "To build a people with a consciousness of their new nature in Christ.",
      buttonText: "Learn More",
      buttonLink: "/next-steps"
    }
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);

    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  const BalloonImage = ({ className, gradient, img, alt, yRange = [0, -60], xRange = [0, 0], zIndex = 1, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], yRange);
    const x = useTransform(scrollY, [0, 800], xRange);
    const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
    const rotate = useTransform(scrollY, [0, 800], [0, 5]);
    
    return (
      <motion.div
        className={className}
        ref={ref}
        style={{ y, x, scale, rotate, willChange: 'transform', zIndex }}
        transition={{ 
          type: 'spring', 
          stiffness: 60, 
          damping: 15
        }}
        whileHover={{ 
          scale: 1.05,
          rotate: 2,
          transition: { duration: 0.3 }
        }}
      >
        <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center relative group`}>
          <img src={img} alt={alt} className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </motion.div>
    );
  }; 

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-2 sm:px-4 py-12 md:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="text-center mb-12 pt-8 md:mb-20 relative z-10">
            <h1 className="block text-3xl md:text-6xl font-semibold text-black mb-4 md:mb-6 leading-tight">
              You're not just a visitor, you're family!
            </h1>
            <p className="text-base md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Going to a new church and meeting new people for the first time can be intimidating. 
              We want to help make your first experience at New Creature in Christ Church a memorable one.
            </p>
          </div>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-20 relative z-10">
            <Link
              to="/events"
              className="px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-all duration-200 text-lg hover:scale-105 shadow-lg"
            >
              Explore Events
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-all duration-200 text-lg hover:scale-105 shadow-lg"
            >
              Who We Are
            </Link>
          </div>

          {/* Dynamic Image Grid - Enhanced Balloon Effect */}
          <motion.div 
            className="relative h-[500px] md:h-[600px] max-w-6xl mx-auto mb-12 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Large Image - Center Left */}
            <BalloonImage
              className="absolute left-4 top-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96"
              gradient="from-blue-400 to-purple-600"
              img={women}
              alt="Church Community"
              yRange={[0, -100]}
              xRange={[0, -20]}
              zIndex={3}
              delay={0.2}
            />
            
            {/* Top Right - Woman Singing */}
            <BalloonImage
              className="absolute right-4 top-4 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72"
              gradient="from-purple-300 to-blue-400"
              img={victor}
              alt="Woman Singing"
              yRange={[0, -140]}
              xRange={[0, 60]}
              zIndex={2}
              delay={0.4}
            />
            
            {/* Bottom Right - Girl Praying */}
            <BalloonImage
              className="absolute right-8 bottom-4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64"
              gradient="from-blue-300 to-indigo-400"
              img={pastor2}
              alt="Girl Praying"
              yRange={[0, 80]}
              xRange={[0, 40]}
              zIndex={2}
              delay={0.6}
            />
            
            {/* Center - Young Woman */}
            <BalloonImage
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64"
              gradient="from-pink-300 to-purple-400"
              img={joie}
              alt="Young Woman with Peace Signs"
              yRange={[0, -60]}
              xRange={[0, -40]}
              zIndex={4}
              delay={0.8}
            />
          </motion.div>
        </div>
      </section>

          {/* Vision/Mission Carousel Section */}
          <section className="w-full bg-black py-12 md:py-32 rounded-2xl mb-12">
            <div className="max-w-7xl mx-auto px-2 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Side - Text and CTA */}
                <div className="text-white space-y-6 md:space-y-8 relative min-h-[220px] md:min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute w-full"
                    >
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                        {carouselSlides[currentSlide].title}
                      </h2>
                      <p className="text-base md:text-2xl leading-relaxed text-gray-200 max-w-lg mb-6 md:mb-8">
                        {carouselSlides[currentSlide].content}
                      </p>
                      <div className="pt-2 md:pt-4">
                        <Link
                          to={carouselSlides[currentSlide].buttonLink}
                          className="inline-block bg-white hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-all duration-200 hover:scale-105"
                        >
                          {carouselSlides[currentSlide].buttonText}
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Right Side - Placeholder for stage image */}
                <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-40 sm:h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={wealth} 
                  alt="Pastor on Stage" 
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                />
                  </div>
                </div>
              </div>
              {/* Carousel Indicators */}
              <div className="flex justify-center gap-3 mt-8">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      resetTimeout();
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-gray-500 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

      {/* Sunday Services Section */}
      <section className="px-2 sm:px-4 py-12 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl font-semibold text-black mb-4 md:mb-6 text-center">
            Sunday Services
          </h2>
          {/* Introductory Paragraph */}
          <p className="text-base md:text-lg text-black mb-8 md:mb-12 leading-relaxed text-center max-w-4xl mx-auto">
            Our Sunday services comprise of a variety including thanksgiving service, anointing service, victory celebration service, super praise jamboree service and mission Sunday service across different Sundays of the month. Our Sunday services afford us the time to celebrate the grace and mercies of God, as we pray sing praises to God and feed on the undiluted word that nourishes the souls.
          </p>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Sunday Services Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Sunday Services
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-base text-gray-700 leading-relaxed">
                  Our Sunday services starts by <span className="font-semibold text-blue-600">9:00 AM</span> and ends by <span className="font-semibold text-blue-600">11:00 AM</span>.
                </p>
                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    Join us for powerful worship, inspiring messages, and community fellowship.
                  </p>
                </div>
              </div>
            </div>

            {/* Mid-week Services Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Mid-week Services
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-base text-gray-700 leading-relaxed">
                  Our mid-week Services consists of Word Study and Prayers and holds on <span className="font-semibold text-purple-600">Thursdays</span> from <span className="font-semibold text-purple-600">6:00 PM - 7:30 PM</span>.
                </p>
                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    Deep dive into God's Word and join in corporate prayer.
                  </p>
                </div>
              </div>
            </div>

            {/* Join Us Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  Join Us
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-base text-gray-700 leading-relaxed">
                  We'd love to have you join us for any of our services. Experience the warmth and love of our church family.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 group"
                  >
                    Get Directions
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewHere; 

