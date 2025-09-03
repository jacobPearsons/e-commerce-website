import React from 'react';

const funds = [
  {
    title: 'Greenharbor US Value Fund',
    description: 'Seek return potential from high-quality undervalued US companies with strong financials and cash flows.',
    slug: 'greenharbor-us-value-fund',
  },
  {
    title: 'Greenharbor International All Cap Equity Fund',
    description: 'True international exposure provides diversification beyond North American equities.',
    slug: 'greenharbor-international-all-cap-equity-fund',
  },
  {
    title: 'Greenharbor GQE Global Balanced Fund',
    description: 'A globally diversified balanced portfolio of equities and fixed income that seeks to provide attractive risk-adjusted returns.',
    slug: 'greenharbor-gqe-global-balanced-fund',
  },
  {
    title: 'Greenharbor GQE US Alpha Extension Fund',
    description: 'An innovative alpha-focused core extension strategy that aims to generate excess return potential from both long and short positions.',
    slug: 'greenharbor-gqe-us-alpha-extension-fund',
  },
];

export default function FeaturedFunds() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-2 font-sans">Featured funds</h2>
        <div className="text-center mb-10">
          <a
            href="/funds"
            className="text-green-500 hover:underline text-base font-semibold inline-block"
          >
            View all funds &rarr;
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {funds.map((fund) => (
            <div
              key={fund.title}
              className="bg-gradient-to-br from-[#f8f5ef] to-[#e8d7c5] rounded-xl shadow border border-[#e0d6c2] p-8 flex flex-col justify-between min-h-[210px]"
            >
              <div>
                <span className="text-xl font-serif text-green-800 font-bold mr-2 align-middle">New</span>
                <span className="text-xl md:text-2xl font-bold text-[#16392d] font-serif align-middle">{fund.title}</span>
                <p className="text-gray-700 text-base md:text-lg font-serif mt-4 mb-6">{fund.description}</p>
              </div>
              <a
                href={`/funds/${fund.slug}`}
                className="text-green-600 hover:underline text-sm font-semibold mt-auto inline-block"
              >
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 