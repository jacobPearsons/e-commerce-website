import { JobSeekerService } from '../../types/jobSeekerTypes';

const jobSeekerServices: JobSeekerService[] = [
  {
    id: "resume-support",
    title: "Resume & Cover Letter Mastery",
    description: "Transform your application materials into compelling career stories that get noticed by hiring managers and ATS systems alike.",
    features: [
      "1-on-1 consultations with certified career coaches",
      "ATS optimization for 98% scan success rate",
      "Industry-specific formatting guidance",
      "3 free revisions within 30 days"
    ],
    icon: "ri-file-edit-line",
    cta: {
      text: "Get Your Resume Review",
      link: "/job-seekers"
    }
  },
  {
    id: "interview-prep",
    title: "Interview Confidence Program",
    description: "Master the art of interviewing with our proven framework for behavioral, technical, and case-style interviews.",
    features: [
      "Mock interviews with real-time feedback",
      "Salary negotiation playbook",
      "Body language and virtual presence training",
      "Company-specific question banks"
    ],
    icon: "ri-chat-check-line",
    cta: {
      text: "Take Interview Now",
      link: "/job-seekers"
    }
  },
  {
    id: "career-growth",
    title: "Career Accelerator Toolkit",
    description: "Continuous learning resources to stay ahead in today's dynamic job market.",
    features: [
      "Monthly live webinars with industry leaders",
      "Exclusive networking community access",
      "Personalized upskilling roadmaps",
      "Trend reports for 50+ professions"
    ],
    icon: "ri-line-chart-line",
    cta: {
      text: "Explore Resources",
      link: "/job-seekers"
    }
  }
];

export default jobSeekerServices;