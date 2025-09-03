import React, { useState } from 'react';

interface CalculatorProps {
  initialInvestment: number;
}

const ImpactCalculator = ({ initialInvestment }: CalculatorProps) => {
  const [investment, setInvestment] = useState(initialInvestment);
  const co2Reduction = (investment * 0.3).toLocaleString(undefined, { maximumFractionDigits: 0 }); // Example metric

  return (
    <div className="glass-card p-6 rounded-xl bg-white/80 shadow-lg flex flex-col items-center">
      <h3 className="font-sans text-lg mb-4 text-[#2E5E4E] font-bold">Your Impact Potential</h3>
      <input
        type="range"
        min="10000"
        max="1000000"
        step="1000"
        value={investment}
        onChange={(e) => setInvestment(Number(e.target.value))}
        className="w-full mb-4 accent-[#007D8C]"
      />
      <p className="mt-2 text-center text-gray-800">
        <span className="font-bold text-[#007D8C]">${investment.toLocaleString()}</span> could prevent <strong className="text-[#2E5E4E]">{co2Reduction} tons</strong> of CO2 annually.
      </p>
    </div>
  );
};

export default ImpactCalculator; 