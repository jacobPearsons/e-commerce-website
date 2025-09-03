import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logo } from '../assets/images'
import FeaturedFunds from '../components/FeaturedFunds';
import ApplicationsFormsGrid from '../components/ApplicationsFormsGrid';

const differentiators = [
  {
    title: 'ESG-Integrated Analysis',
    description: 'AI-powered screening of 200+ sustainability metrics alongside financials.',
    icon: '🌱',
  },
  {
    title: 'Thematic Investing',
    description: 'Focus on clean energy, circular economy, and social infrastructure.',
    icon: '🔋',
  },
  {
    title: 'Transparent Performance',
    description: 'Quarterly impact reports with carbon footprint reduction metrics.',
    icon: '📊',
  },
];

const approachSteps = [
  { title: 'Discovery', description: 'Custom risk assessment' },
  { title: 'Strategy', description: 'Portfolio modeling with Monte Carlo simulations' },
  { title: 'Execution', description: 'Direct access to green bonds/private equity' },
  { title: 'Stewardship', description: 'Continuous impact monitoring' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8D7C5] to-white">
      {/* Hero Banner */}
      <section className="relative flex flex-col items-center justify-center text-center pt-52 md:pt-64 pb-20 px-4 bg-gradient-to-br from-[#007D8C] to-[#000]">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-green-600 mb-8 font-sans tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45), 0 1px 0 #007D8C' }}
        >
          Redefining Wealth Management for the Conscious Investor
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-[#E8D7C5] mb-10 max-w-2xl mx-auto font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Custom portfolios aligning your financial goals with global sustainability benchmarks.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/portfolio"
            className="bg-yellow-400 hover:bg-yellow-500 text-[#16392d] font-bold px-8 py-4 rounded-lg shadow-lg text-lg tracking-wide"
          >
            Explore Our Strategies &rarr;
          </Link>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-green-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#007D8C] mb-4 font-sans">Growing Wealth, Preserving Tomorrow</h2>
          <p className="text-lg text-black font-serif">
            Greenharbor Capital is a boutique investment firm specializing in sustainable growth strategies. We combine data-driven financial expertise with ESG principles to build portfolios that deliver competitive returns while creating positive environmental and social impact.
          </p>
        </div>
      </section>

      <FeaturedFunds />

      {/* Insights & Updates Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-2 font-sans">Insights & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-[#f8f5ef] to-[#e8d7c5] rounded-xl shadow border border-[#e0d6c2] p-8 flex flex-col justify-between min-h-[210px]">
              <div>
                <span className="text-xl md:text-2xl font-bold text-[#16392d] font-serif align-middle block mb-2">Unconventional investing: Mackenzie Ivy’s long-term focus</span>
                <p className="text-gray-700 text-base md:text-lg font-serif mb-6">While others may shy away from market volatility, the Mackenzie Ivy Team sees it as a chance to enhance returns. Their focused, research-intensive strategy has historically yielded strong results, even amid market contractions.</p>
              </div>
              <a href="#" className="text-green-600 hover:underline text-sm font-semibold mt-auto inline-block">Learn more</a>
            </div>
            {/* Card 2 */}
            <div className="bg-gradient-to-br from-[#f8f5ef] to-[#e8d7c5] rounded-xl shadow border border-[#e0d6c2] p-8 flex flex-col justify-between min-h-[210px]">
              <div>
                <span className="text-xl md:text-2xl font-bold text-[#16392d] font-serif align-middle block mb-2">2025 Mid-year tax cards</span>
                <span className="text-green-700 font-semibold text-base mb-1 block">Tax & Estate</span>
                <p className="text-gray-700 text-base md:text-lg font-serif mb-6">The 2025 mid-year tax updates are here, including marginal tax rates for every province/territory, income level and type of income, and other personal/corporate tax rates and more.</p>
              </div>
              <a href="#" className="text-green-600 hover:underline text-sm font-semibold mt-auto inline-block">Download now</a>
            </div>
            {/* Card 3 */}
            <div className="bg-gradient-to-br from-[#f8f5ef] to-[#e8d7c5] rounded-xl shadow border border-[#e0d6c2] p-8 flex flex-col justify-between min-h-[210px]">
              <div>
                <span className="text-xl md:text-2xl font-bold text-[#16392d] font-serif align-middle block mb-2">Alpha extension: an innovative approach to core equities</span>
                <span className="text-green-700 font-semibold text-base mb-1 block">Insight</span>
                <p className="text-gray-700 text-base md:text-lg font-serif mb-6">An alpha extension strategy offers the flexibility to capture more alpha potential from both long and short positions without significantly deviating from the risk parameters of traditional mandates.</p>
              </div>
              <a href="#" className="text-green-600 hover:underline text-sm font-semibold mt-auto inline-block">Learn more</a>
            </div>
            {/* Card 4 */}
            <div className="bg-gradient-to-br from-[#f8f5ef] to-[#e8d7c5] rounded-xl shadow border border-[#e0d6c2] p-8 flex flex-col justify-between min-h-[210px]">
              <div>
                <span className="text-xl md:text-2xl font-bold text-[#16392d] font-serif align-middle block mb-2">Weekly Market Snapshot</span>
                <span className="text-green-700 font-semibold text-base mb-1 block">Insight</span>
                <p className="text-gray-700 text-base md:text-lg font-serif mb-6">Justin Truong, CFA, Senior Manager, Investment Strategy, shares his weekly insights and analysis of the market and economy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Approach Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 text-center mb-12 font-sans">Our Investment Approach</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {approachSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 min-w-[180px]">
                <div className="bg-[#2E5E4E] text-yellow-300 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  {idx + 1}
                </div>
                <h4 className="text-lg font-bold text-[#2E5E4E] mb-1 font-sans">{step.title}</h4>
                <p className="text-gray-700 text-center font-serif mb-2">{step.description}</p>
                {idx < approachSteps.length - 1 && (
                  <div className="hidden md:block w-12 h-1 bg-[#007D8C] my-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reference-Inspired Section */}
      <section className="flex justify-center items-center py-16 px-4 bg-transparent">
        <div className="w-full max-w-5xl bg-white rounded-3xl flex flex-col md:flex-row items-center shadow-lg p-8 md:p-16 relative overflow-hidden border border-green-700">
          <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-12 flex flex-col items-center">
            <img src={logo} alt="GreenHarbor Capital Logo" className="w-48 h-auto object-contain mb-4" />
            <span className="text-lg font-bold text-green-900">GreenHarbor Capital</span>
          </div>
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2E5E4E] mb-6 leading-tight">Support your clients with RESP withdrawals</h2>
            <a href="/mutual-funds" className="text-xl underline text-green-700 mb-4">Step-by-step instructions and helpful resources.</a>
            {/* Add CTA or more content here if needed */}
          </div>
        </div>
      </section>

      {/* Applications and Forms Section (Reference-Inspired) */}
      <section className="py-16 px-4 bg-green-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 font-sans">Applications and forms</h2>
          <ApplicationsFormsGrid
            rows={[
              [
                { label: 'RESP Educational Withdrawal Form' },
                { label: 'RESP Non-Educational Withdrawal Form' },
                { label: 'Multi-Plan Application' },
              ],
              [
                { label: 'RDSP Application Form' },
                { label: 'RESP Government Grant Application Form (SDE0093)' },
              ],
              [
                { label: 'Canada Disability Savings Grant and/or Canada... (EMP5608)' },
              ],
              [
                { label: 'Transfer Authorization for Registered & Non-registered Accounts' },
                { label: 'RESP – Family Plan Application' },
              ],
              [
                { label: 'Annex A – Additional Beneficiaries Application (SDE0093-A)' },
              ],
              [
                { label: 'Annex B – Primary Caregiver Application for... (SDE0093-B)' },
                { label: 'Tax-Free Savings Account Application' },
              ],
            ]}
          />
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-[#E8D7C5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {differentiators.map((item, idx) => (
            <div key={idx} className="bg-white/10 rounded-2xl shadow-lg p-8 flex flex-col items-center glassmorphism">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#2E5E4E] mb-2 font-sans">{item.title}</h3>
              <p className="text-gray-700 text-center font-serif">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 