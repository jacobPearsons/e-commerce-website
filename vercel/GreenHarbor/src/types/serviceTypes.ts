export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string; // Optional icon name
}

export interface GetStartedStep {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface EmployerSection {
  header: string;
  subheader: string;
  services: Service[];
  getStartedSteps: GetStartedStep[];
  closingStatement: string;
} 