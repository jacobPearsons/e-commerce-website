import { EmployerSection } from '../../types/serviceTypes';

const employerServices: EmployerSection = {
  header: "Transform Your Hiring with PathMatch",
  subheader: "Comprehensive recruitment solutions designed for modern businesses",
  
  services: [
    {
      id: 1,
      title: "Comprehensive Recruitment Services",
      description: "From temporary staffing to executive placements, we customize solutions to match your unique hiring needs across all employment types.",
      icon: "ri-team-line"
    },
    {
      id: 2,
      title: "Industry-Specific Expertise",
      description: "Specialized recruiters with deep knowledge in technology, healthcare, finance, and manufacturing ensure precision-matched candidates.",
      icon: "ri-medal-line"
    },
    {
      id: 3,
      title: "Global Talent Access",
      description: "Tap into our curated network of 500K+ professionals, including passive candidates with niche skills you won't find on job boards.",
      icon: "ri-global-line"
    },
    {
      id: 4,
      title: "Job Description Optimization",
      description: "Our copywriters craft compelling listings that highlight your culture and attract top-tier talent while reducing unqualified applicants.",
      icon: "ri-edit-2-line"
    },
    {
      id: 5,
      title: "Streamlined Hiring Pipeline",
      description: "We handle sourcing, screening, and initial interviews - delivering vetted candidates in 72 hours average.",
      icon: "ri-flow-chart-line"
    },
    {
      id: 6,
      title: "Data-Driven Assessments",
      description: "Behavioral analysis and skills testing ensure 92% cultural fit accuracy through our proprietary evaluation framework.",
      icon: "ri-bar-chart-line"
    },
    {
      id: 7,
      title: "Employer Brand Amplification",
      description: "Strategic branding packages that showcase your EVP across our network of 1M+ professionals.",
      icon: "ri-megaphone-line"
    },
    {
      id: 8,
      title: "Post-Placement Support",
      description: "90-day retention guarantee with onboarding optimization and new hire check-ins.",
      icon: "ri-customer-service-line"
    },
    {
      id: 9,
      title: "Strategic Workforce Planning",
      description: "Market intelligence and skills gap analysis for future-proof talent acquisition strategies.",
      icon: "ri-map-2-line"
    }
  ],

  getStartedSteps: [
    {
      id: 1,
      title: "Submit Job Opening",
      description: "Post vacancies through our streamlined portal",
      ctaText: "Post a Job",
      ctaLink: "/job-seekers"
    },
    {
      id: 2,
      title: "Schedule Consultation",
      description: "Get personalized recruitment strategy session",
      ctaText: "Book Meeting",
      ctaLink: "/job-seekers"
    },
    {
      id: 3,
      title: "Explore Case Studies",
      description: "See how we helped companies like yours",
      ctaText: "View Success Stories",
      ctaLink: "/job-seekers"
    },
    {
      id: 4,
      title: "Join Employer Network",
      description: "Get market insights and hiring trends",
      ctaText: "Subscribe Now",
      ctaLink: "/employer"
    }
  ],

  closingStatement: "At PathMatch, we're not just filling positions - we're building competitive advantage through strategic talent partnerships. Let's engineer your dream team together."
};

export default employerServices;