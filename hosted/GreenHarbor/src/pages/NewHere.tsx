import React from 'react';
import { logowide } from '../assets/images'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="text-center mb-16 pt-12 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              You're not just a visitor, you're family!
            </h1>
            <p className="text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Going to a new church and meeting new people for the first time can be intimidating. 
              We want to help make your first experience at New Creature in Christ Church a memorable one.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 md:mb-20">
            <Link
              to="/visit"
              className="px-8 py-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-colors duration-200 text-lg"
            >
              Visit New Creature
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors duration-200 text-lg"
            >
              Who We Are
            </Link>
          </div>

          {/* Vision/Mission Carousel Section */}
          <section className="w-full bg-black py-20 md:py-32 rounded-2xl mb-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Text and CTA */}
                <div className="text-white space-y-8 relative min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute w-full"
                    >
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        {carouselSlides[currentSlide].title}
                      </h2>
                      <p className="text-xl md:text-2xl leading-relaxed text-gray-200 max-w-lg mb-8">
                        {carouselSlides[currentSlide].content}
                      </p>
                      <div className="pt-4">
                        <Link
                          to={carouselSlides[currentSlide].buttonLink}
                          className="inline-block bg-white hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg shadow-lg text-lg transition-colors duration-200"
                        >
                          {carouselSlides[currentSlide].buttonText}
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side - Placeholder for stage image */}
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-lg h-80 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">[ Stage Image Placeholder ]</span>
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

          {/* Dynamic Image Grid */}
          <div className="relative h-96 md:h-[500px] max-w-4xl mx-auto">
            {/* Main Large Image - Bottom Center */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 md:w-96 md:h-96">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Church Community Image</span>
                </div>
              </div>
            </div>

            {/* Left Image - Young Woman */}
            <div className="absolute top-4 left-4 md:left-8 w-64 h-64 md:w-72 md:h-72 z-10">
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 rounded-2xl shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Young Woman with Peace Signs</span>
                </div>
              </div>
            </div>

            {/* Right Stack - Multiple Overlapping Images */}
            <div className="absolute top-8 right-4 md:right-8 space-y-4 z-20">
              {/* Top Right - Girl with Bow */}
              <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-pink-200 to-rose-300 rounded-2xl shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Girl with Pink Bow</span>
                </div>
              </div>

              {/* Middle Right - Girl Praying */}
              <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-2xl shadow-xl overflow-hidden ml-8">
                <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Girl Praying</span>
                </div>
              </div>

              {/* Bottom Right - Woman Singing */}
              <div className="w-44 h-44 md:w-52 md:h-52 bg-gradient-to-br from-purple-300 to-blue-400 rounded-2xl shadow-xl overflow-hidden ml-4">
                <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center relative">
                  <span className="text-gray-500 text-xs">Woman Singing</span>
                  {/* Next Steps Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-yellow-900 text-xs font-bold">NS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sunday Services Section */}
      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Sunday Services
          </h2>

          {/* Introductory Paragraph */}
          <p className="text-base md:text-lg text-black mb-12 leading-relaxed">
            Our Sunday services comprise of a variety including thanksgiving service, anointing service, victory celebration service, super praise jamboree service and mission Sunday service across different Sundays of the month. Our Sunday services afford us the time to celebrate the grace and mercies of God, as we pray sing praises to God and feed on the undiluted word that nourishes the souls.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Sunday Services */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                  Sunday Services
                </h3>
                <div className="space-y-3">
                  <p className="text-base text-black">
                    Our Sunday services starts by 9.00am and ends by 11am.
                  </p>
                </div>
              </div>

              {/* Mid-week Services */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                  Mid-week Services
                </h3>
                <div className="space-y-3">
                  <p className="text-base text-black">
                    Our mid-week Services consists of Word Study and Prayers and holds on Thursdays from 6p.m. - 7:30p.m.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Placeholder for additional content */}
            <div className="flex items-start justify-center">
              <div className="w-full max-w-sm">
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-black mb-2">
                    Join Us
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We'd love to have you join us for any of our services
                  </p>
                  <Link
                    to="/directions"
                    className="inline-flex items-center text-black font-bold hover:underline"
                  >
                    Get Directions →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="mailto:info@newcreaturechurch.com" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
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
    </div>
  );
};

export default NewHere; 