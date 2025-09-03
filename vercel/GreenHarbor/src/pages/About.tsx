import React from 'react';
import { aboutChurch, aboutChurch2 } from '../assets/images'
import { ObjectivesAccordion } from '../components/ObjectivesAccordion';
import { Link } from 'react-router-dom';
import TakeNextStepSection from '../components/TakeNextStepSection';
import Footer from '../components/Footer';
const About = () => {
  return (
    <>
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto pt-8 md:pt-12 px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              About Us
            </h2>
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed max-w-2xl mx-auto md:mx-0">
              New Creature in Christ Church (NCCC) was established in 1998 in obedience to God’s leading under the visionary leadership of Reverend Roseline Adeyinka Obaaro (1948 – 2011) with the aim of propagating the gospel of our Lord and Saviour, Jesus Christ. Having a Vision to reconcile the world to Christ, our Mission is to build a people with a consciousness of their new nature in Christ and reach out to people in need.
            </p>
          </div>
          {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <img src={aboutChurch} alt="About New Creature in Christ Church" className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md object-cover border border-gray-200 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '4/5' }} />
          </div>
        </div>
      </section>
      {/* Narrative Section (Inverted) */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Text with Border - show first on mobile */}
          <div className="w-full md:w-1/2 order-1 md:order-1 flex justify-center md:justify-end">
            <div className="border border-gray-300 rounded-2xl bg-gray-50 p-6 md:p-12 shadow-md w-full text-center">
              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">
                One of the distinct instructions from the Lord to the Founding Overseer and President was that she should see to it that the freedom given to her also circulates to others freely.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed mt-4 md:mt-6">
                In line with the vision of the Church, NCCC has over the years continued to make disciples from all nations for Christ, reconciling men to God, reuniting families to harmony and spreading love in the process. Men and women have received direction and found a purpose for their existence, and have become established in the faith of Christ, bringing about God fearing individuals and families.
              </p>
            </div>
          </div>
          {/* Image - show after text on mobile */}
          <div className="flex justify-center md:justify-start w-full md:w-1/2 order-2 md:order-2">
            <img src={aboutChurch2} alt="About New Creature in Christ Church" className="rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md object-cover border border-gray-200 transition-all duration-300 hover:scale-105" style={{ aspectRatio: '5/4' }} />
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="w-full bg-white py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 md:mb-6">Our Mission</h2>
          <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed">
            At New Creature in Christ Church, our mission as enshrined in our Constitution guide everything we do and inform our mission to bring people closer to God.
          </p>
        </div>
      </section>
      {/* Objectives Accordion Section */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <ObjectivesAccordion />
        </div>
      </section>
      <TakeNextStepSection />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;