import React from 'react';
import FundDataGrid from '../components/FundDataGrid';
import { internationalFundData } from '../data/sampleFundData';

const subNav = [
  { label: 'Overview', to: '#' },
  { label: 'Commentary', to: '#' },
  { label: 'Performance', to: '#' },
  { label: 'Portfolio', to: '#' },
  { label: 'Codes & Fees', to: '#' },
  { label: 'Historical Data', to: '#' },
  { label: 'Resources', to: '#' },
];

export default function InternationalFund() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Title */}
      <div className="max-w-6xl mx-auto pt-72 pb-2 px-4">
        <h1 className="text-5xl md:text-6xl font-serif font-normal text-green-900 mb-6">Greenharbor International All Cap Equity Fund</h1>
      </div>
      
      {/* Sub-navigation */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <nav className="flex gap-8 border-b border-green-700 w-full pb-2">
          {subNav.map((item, idx) => (
            <a
              key={item.label}
              href={item.to}
              className={
                `text-green-900 font-semibold text-base md:text-lg hover:underline hover:text-green-700 transition-colors` +
                (idx === 0 ? ' underline bg-green-50 px-2 py-1 rounded' : '')
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
        {/* Series dropdown */}
        <div className="hidden md:block ml-8">
          <div className="border border-gray-400 rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 bg-white shadow-sm min-w-[120px] text-right cursor-pointer hover:bg-gray-50">
            Series F <span className="ml-2">▼</span>
          </div>
        </div>
      </div>
      
      {/* Section: Why invest in this fund? */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-3xl md:text-4xl font-serif text-green-900 text-center mb-6">Why invest in this fund?</h2>
        <ul className="list-disc pl-8 text-lg text-gray-800 space-y-2">
          <li>True international exposure provides diversification beyond North American equities.</li>
          <li>Broad market cap spectrum invests in strong businesses across large, mid- and small-cap companies.</li>
          <li>Expert regional insights inform the fundamental process of Greenharbor Europe and Asia Teams.</li>
        </ul>
      </div>

      {/* Fund Data Grid */}
      <div className="mt-16">
        <FundDataGrid fundData={internationalFundData} />
      </div>
    </div>
  );
} 