export interface JobSeekerService {
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string; // Remix Icon class
    cta: {
      text: string;
        link: string;
    };
  }