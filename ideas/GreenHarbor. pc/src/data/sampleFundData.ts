import { FundData } from '../types/FundData';

export const sampleFundData: FundData = {
  assetClass: {
    value: "Alternative Strategies",
    viewAll: true,
  },
  totalFundAssets: {
    value: 415610560,
    currency: "CAD",
    date: "Jun 29, 2025",
  },
  indexBenchmark: {
    components: [
      { percentage: 25, name: "MSCI World High Dividend Yield" },
      { percentage: 10, name: "MSCI World Infrastructure" },
      { percentage: 10, name: "FTSE EPRA Nareit Developed REIT" },
      { percentage: 40, name: "ICE BofA Global Broad Market (Hedged to CAD)" },
      { percentage: 15, name: "ICE BofA Global High Yield (Hedged to CAD)" },
    ],
    note: "*",
  },
  riskTolerance: {
    value: "Low-Med",
    level: 35, // Position on the slider (0-100)
  },
  fundRiskMeasures: {
    annualizedStandardDeviation: 10.34,
    annualizedStandardDeviationBenchmark: 7.24,
    alpha: -1.64,
    period: "3 years",
    date: "Jun 29, 2025",
  },
  managementFee: {
    managementFee: 0.75,
    mer: 1.05,
    date: "Mar 30, 2025",
  },
  dailyPrice: {
    navps: 12.45,
    currency: "CAD",
    date: "Jun 29, 2025",
  },
  lastPaidDistribution: {
    amount: 0.08,
    currency: "CAD",
    date: "Jun 28, 2025",
  },
  distributionFrequency: {
    value: "Monthly",
  },
};

export const internationalFundData: FundData = {
  assetClass: {
    value: "Global Equity",
    viewAll: true,
  },
  totalFundAssets: {
    value: 7559998,
    currency: "CAD",
    date: "Jun 29, 2025",
  },
  indexBenchmark: {
    components: [
      { percentage: 100, name: "MSCI EAFE IMI Index" },
    ],
    note: "*",
  },
  riskTolerance: {
    value: "Med",
    level: 50, // Position on the slider (0-100)
  },
  fundRiskMeasures: {
    annualizedStandardDeviation: null,
    annualizedStandardDeviationBenchmark: 11.02,
    alpha: null,
    beta: null,
    r2: null,
    sharpeRatio: null,
    period: "3 years",
    date: "Jun 29, 2025",
  },
  managementFee: {
    managementFee: 0.8,
    mer: null,
    date: "Mar 30, 2025",
  },
  dailyPrice: {
    navps: 10.94,
    currency: "CAD",
    usdValue: 8.02,
    date: "Jul 23, 2025",
  },
  lastPaidDistribution: {
    amount: null,
    currency: "CAD",
    date: null,
  },
  distributionFrequency: {
    value: "Annual",
  },
};

export const alphaExtensionFundData: FundData = {
  assetClass: {
    value: "Alternative Strategies",
    viewAll: true,
  },
  totalFundAssets: {
    value: 13661552,
    currency: "CAD",
    date: "Jun 29, 2025",
  },
  indexBenchmark: {
    components: [
      { percentage: 100, name: "S&P 500" },
    ],
    note: "*",
  },
  riskTolerance: {
    value: "Med",
    level: 50, // Position on the slider (0-100)
  },
  fundRiskMeasures: {
    annualizedStandardDeviation: null,
    annualizedStandardDeviationBenchmark: 12.92,
    alpha: null,
    beta: null,
    r2: null,
    sharpeRatio: null,
    period: "3 years",
    date: "Jun 29, 2025",
  },
  managementFee: {
    managementFee: 1.15,
    mer: null,
    date: "Mar 30, 2025",
  },
  dailyPrice: {
    navps: 11.98,
    currency: "CAD",
    usdValue: 8.78,
    date: "Jul 23, 2025",
  },
  lastPaidDistribution: {
    amount: null,
    currency: "CAD",
    date: null,
  },
  distributionFrequency: {
    value: "Annual",
  },
};

export const globalBalancedFundData: FundData = {
  assetClass: {
    value: "Global Balanced",
    viewAll: true,
  },
  totalFundAssets: {
    value: 9879209,
    currency: "CAD",
    date: "Jun 29, 2025",
  },
  indexBenchmark: {
    components: [
      { percentage: 60, name: "MSCI World" },
      { percentage: 40, name: "ICE BofA Global Broad Market (Hedged to CAD)" },
    ],
    note: "*",
  },
  riskTolerance: {
    value: "Low-Med",
    level: 35, // Position on the slider (0-100)
  },
  fundRiskMeasures: {
    annualizedStandardDeviation: null,
    annualizedStandardDeviationBenchmark: 8.66,
    alpha: null,
    beta: null,
    r2: null,
    sharpeRatio: null,
    period: "3 years",
    date: "Jun 29, 2025",
  },
  managementFee: {
    managementFee: 0.7,
    mer: null,
    date: "Mar 30, 2025",
  },
  dailyPrice: {
    navps: 11.10,
    currency: "CAD",
    date: "Jul 23, 2025",
  },
  lastPaidDistribution: {
    amount: null,
    currency: "CAD",
    date: null,
  },
  distributionFrequency: {
    value: "Annual",
  },
}; 