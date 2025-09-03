export interface FundRiskMeasures {
  annualizedStandardDeviation: number | null;
  annualizedStandardDeviationBenchmark: number | null;
  alpha: number | null;
  beta?: number | null;
  r2?: number | null;
  sharpeRatio?: number | null;
  period: string;
  date: string;
}

export interface BenchmarkComponent {
  percentage: number;
  name: string;
}

export interface FundData {
  assetClass: {
    value: string;
    viewAll?: boolean;
  };
  totalFundAssets: {
    value: number;
    currency: string;
    date: string;
  };
  indexBenchmark: {
    components: BenchmarkComponent[];
    note?: string;
  };
  riskTolerance: {
    value: string;
    level: number; // 0-100 for slider position
  };
  fundRiskMeasures: FundRiskMeasures;
  managementFee: {
    managementFee: number;
    mer: number | null;
    date: string;
  };
  dailyPrice: {
    navps: number;
    currency: string;
    usdValue?: number;
    date: string;
  };
  lastPaidDistribution: {
    amount: number | null;
    currency: string;
    date: string | null;
  };
  distributionFrequency: {
    value: string;
  };
} 