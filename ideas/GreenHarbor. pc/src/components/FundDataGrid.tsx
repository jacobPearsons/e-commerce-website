import React from 'react';
import { FundData } from '../types/FundData';
import FundDataCard from './FundDataCard';

interface FundDataGridProps {
  fundData: FundData;
}

export default function FundDataGrid({ fundData }: FundDataGridProps) {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatValue = (value: number | null) => {
    if (value === null || value === undefined) return '-';
    return value.toFixed(2);
  };

  return (
    <div className="bg-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Asset Class */}
          <FundDataCard 
            title="Asset Class"
            actionLink={{ text: "View All", href: "#" }}
          >
            <div className="w-full text-center">
              <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full text-lg font-bold">
                {fundData.assetClass.value}
              </span>
            </div>
          </FundDataCard>

          {/* Total Fund Assets */}
          <FundDataCard 
            title="Total Fund Assets - All Series"
            date={fundData.totalFundAssets.date}
          >
            <div className="w-full text-center">
              <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full text-2xl font-bold">
                {formatCurrency(fundData.totalFundAssets.value, fundData.totalFundAssets.currency)}
              </span>
            </div>
          </FundDataCard>

          {/* Index Benchmark */}
          <FundDataCard 
            title="Index Benchmark*"
          >
            <div className="w-full">
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-full text-sm font-medium">
                {fundData.indexBenchmark.components.map((component, index) => (
                  <div key={index} className="text-left">
                    {component.percentage}% {component.name}
                    {index < fundData.indexBenchmark.components.length - 1 && ' + '}
                  </div>
                ))}
              </div>
            </div>
          </FundDataCard>

          {/* Risk Tolerance */}
          <FundDataCard title="Risk Tolerance">
            <div className="w-full text-center">
              <div className="mb-3">
                <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full text-lg font-bold">
                  {fundData.riskTolerance.value}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${fundData.riskTolerance.level}%` }}
                ></div>
              </div>
            </div>
          </FundDataCard>

          {/* Fund Risk Measures */}
          <FundDataCard 
            title="Fund Risk Measures"
            date={`${fundData.fundRiskMeasures.period} | ${fundData.fundRiskMeasures.date}`}
          >
            <div className="w-full grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="bg-green-100 text-green-900 px-3 py-2 rounded-full text-lg font-bold">
                  {formatValue(fundData.fundRiskMeasures.annualizedStandardDeviation)}
                </div>
                <div className="text-xs text-green-900 mt-1">Annualized Standard Deviation</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-900 px-3 py-2 rounded-full text-lg font-bold">
                  {formatValue(fundData.fundRiskMeasures.annualizedStandardDeviationBenchmark)}
                </div>
                <div className="text-xs text-green-900 mt-1">Annualized Standard Deviation Benchmark</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 text-green-900 px-3 py-2 rounded-full text-lg font-bold">
                  {formatValue(fundData.fundRiskMeasures.alpha)}
                </div>
                <div className="text-xs text-green-900 mt-1">Alpha</div>
              </div>
              {fundData.fundRiskMeasures.beta !== undefined && (
                <div className="text-center">
                  <div className="bg-green-100 text-green-900 px-3 py-2 rounded-full text-lg font-bold">
                    {formatValue(fundData.fundRiskMeasures.beta)}
                  </div>
                  <div className="text-xs text-green-900 mt-1">Beta</div>
                </div>
              )}
              {fundData.fundRiskMeasures.r2 !== undefined && (
                <div className="text-center">
                  <div className="bg-green-100 text-green-900 px-3 py-2 rounded-full text-lg font-bold">
                    {formatValue(fundData.fundRiskMeasures.r2)}
                  </div>
                  <div className="text-xs text-green-900 mt-1">R²</div>
                </div>
              )}
              {fundData.fundRiskMeasures.sharpeRatio !== undefined && (
                <div className="text-center">
                  <div className="bg-green-100 text-green-900 px-3 py-2 rounded-full text-lg font-bold">
                    {formatValue(fundData.fundRiskMeasures.sharpeRatio)}
                  </div>
                  <div className="text-xs text-green-900 mt-1">Sharpe Ratio</div>
                </div>
              )}
            </div>
          </FundDataCard>

          {/* Management Fee | MER */}
          <FundDataCard 
            title="Management Fee | MER"
            date={fundData.managementFee.date}
          >
            <div className="w-full text-center">
              <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full text-lg font-bold">
                {formatPercentage(fundData.managementFee.managementFee)} | {fundData.managementFee.mer ? formatPercentage(fundData.managementFee.mer) : 'n/a'}
              </span>
            </div>
          </FundDataCard>

          {/* Daily Price (NAVPS) */}
          <FundDataCard 
            title="Daily Price (NAVPS)"
            date={fundData.dailyPrice.date}
          >
            <div className="w-full text-center">
              <div className="bg-green-100 text-green-900 px-4 py-2 rounded-full text-lg font-bold">
                {formatCurrency(fundData.dailyPrice.navps, fundData.dailyPrice.currency)}
                {fundData.dailyPrice.usdValue && (
                  <div className="text-sm mt-1">
                    US${fundData.dailyPrice.usdValue.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </FundDataCard>

          {/* Last Paid Distribution */}
          <FundDataCard 
            title="Last Paid Distribution"
            date={fundData.lastPaidDistribution.date}
          >
            <div className="w-full text-center">
              <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full text-lg font-bold">
                {fundData.lastPaidDistribution.amount ? formatCurrency(fundData.lastPaidDistribution.amount, fundData.lastPaidDistribution.currency) : '-'}
              </span>
            </div>
          </FundDataCard>

          {/* Distribution Frequency */}
          <FundDataCard title="Distribution Frequency">
            <div className="w-full text-center">
              <span className="bg-green-100 text-green-900 px-4 py-2 rounded-full text-lg font-bold">
                {fundData.distributionFrequency.value}
              </span>
            </div>
          </FundDataCard>

        </div>
      </div>
    </div>
  );
} 