import React, { useState, ChangeEvent, FormEvent, useReducer } from 'react';
import JobCard from "../components/JobCard"
import JobDetailsModal from "../components/JobDetailsModal"
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer'

const FlipModal = ({ isOpen, onClose, children, jobTitle, companyName }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Modal */}
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 flex flex-col"
          style={{
            transformOrigin: 'center bottom',
            perspective: '1000px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close modal"
            type="button"
          >
            &times;
          </button>

          {/* Job Title and Company Header */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-2xl font-bold text-red-900">{jobTitle}</h2>
            <p className="text-lg text-red-600">{companyName}</p>
          </div>

          {/* Content */}
          <div className="pt-2 pb-1 px-1 flex-1 flex flex-col gap-4">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const initialFilters = {
  search: '',
  location: '',
  jobType: '',
};

const initialState = (jobs) => ({
  jobs,
  visibleJobs: jobs.slice(0, 12),
  filters: initialFilters,
  showAll: false,
  filteredJobs: jobs,
});

function jobReducer(state, action) {
  switch (action.type) {
    case 'SET_FILTERS': {
      const { search, location, jobType } = action.payload;
      let filtered = state.jobs.filter(job => {
        const matchesSearch =
          !search ||
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = !location || job.location === location;
        const matchesJobType = !jobType || job.jobType === jobType;
        return matchesSearch && matchesLocation && matchesJobType;
      });
      return {
        ...state,
        filters: action.payload,
        filteredJobs: filtered,
        visibleJobs: state.showAll ? filtered : filtered.slice(0, 12),
      };
    }
    case 'SHOW_MORE': {
      return {
        ...state,
        showAll: true,
        visibleJobs: state.filteredJobs,
      };
    }
    case 'RESET_FILTERS': {
      return {
        ...state,
        filters: initialFilters,
        filteredJobs: state.jobs,
        visibleJobs: state.showAll ? state.jobs : state.jobs.slice(0, 12),
      };
    }
    default:
      return state;
  }
}

const allLocations = ["Remote", "Hybrid", "On-site"];
const allJobTypes = ["Full-time", "Part-time", "Contract"];

const JobSeekers: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    resume: null as File | null,
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, resume: e.target.files![0] }));
      setAttachments([e.target.files[0]]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // handle form submission logic here
  };
  
  

  const jobsData = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$80,000 - $120,000",
      description: "We are seeking a talented Senior Software Engineer to join our dynamic team. You will be responsible for developing scalable applications, mentoring junior developers, and contributing to architectural decisions. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work hours",
        "Professional development opportunities",
        "Remote work setup allowance"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Marketing Manager",
      company: "Growth Dynamics",
      jobType: "Full-time",
      location: "Hybrid",
      salaryRange: "$65,000 - $85,000",
      description: "Lead our marketing initiatives and drive brand awareness. You'll develop and execute marketing strategies, manage campaigns, and analyze performance metrics to optimize results. This role offers excellent growth opportunities and the chance to work with cutting-edge marketing technologies.",
      requiredSkills: ["Digital Marketing", "SEO", "Google Analytics", "Content Strategy"],
      benefits: [
        "Health insurance",
        "Performance bonuses",
        "Remote work options",
        "Professional development",
        "Team events and activities",
        "Flexible PTO"
      ],
      postedTime: "1 day ago"
    },
    {
      title: "Customer Service Agent",
      company: "Care Connect",
      jobType: "Part-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Assist customers with product information and order support. We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge customer service technologies.",
      requiredSkills: ["Phone Support", "Email Support", "Product Knowledge", "Documentation"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Professional development opportunities",
        "Paid time off and holidays"
      ],
      postedTime: "3 hours ago"
    },
    {
      title: "Data Analyst",
      company: "Insight Analytics",
      jobType: "Full-time",
      location: "On-site",
      salaryRange: "$55,000 - $75,000",
      description: "Transform raw data into actionable insights. You'll analyze complex datasets, create reports, and provide recommendations to drive business decisions. This role offers excellent growth opportunities and the chance to work with cutting-edge analytics technologies.",
      requiredSkills: ["SQL", "Python", "Excel", "Tableau"],
      benefits: [
        "Comprehensive benefits",
        "Learning budget",
        "Flexible PTO",
        "Modern office",
        "Team collaboration",
        "Career advancement opportunities"
      ],
      postedTime: "1 day ago"
    },
    {
      title: "UX/UI Designer",
      company: "Creative Studios",
      jobType: "Contract",
      location: "Remote",
      salaryRange: "$70,000 - $90,000",
      description: "Create beautiful and functional user experiences. Design intuitive interfaces, conduct user research, and collaborate with development teams to bring designs to life. This role offers excellent growth opportunities and the chance to work with cutting-edge design technologies.",
      requiredSkills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      benefits: [
        "Project-based bonuses",
        "Remote work",
        "Creative freedom",
        "Latest tools",
        "Portfolio building",
        "Flexible schedule"
      ],
      postedTime: "5 days ago"
    },
    {
      title: "Sales Representative",
      company: "Revenue Builders",
      jobType: "Full-time",
      location: "Hybrid",
      salaryRange: "$45,000 - $65,000",
      description: "Drive revenue growth through strategic sales initiatives. Build relationships with prospects, conduct product demonstrations, and close deals. This role offers excellent growth opportunities and the chance to work with cutting-edge sales technologies.",
      requiredSkills: ["Sales Techniques", "CRM Management", "Negotiation", "Presentation"],
      benefits: [
        "Commission structure",
        "Health benefits",
        "Sales training",
        "Career advancement",
        "Team incentives",
        "Performance bonuses"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Online Tutor EduConnect",
      company: "Revenue Builders",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Provide online tutoring in various subjects to students... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Teaching", "Subject Expertise", "Communication", "Online Tools"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Customer Service Team Lead",
      company: "Service Excellence",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Lead a team of customer service representatives and ensure quality service... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Leadership", "Team Management", "Customer Service", "Training"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Customer Service Advisor",
      company: "Client First",
      jobType: "Contract",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Provide expert advice and support to customers across multiple channels... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Advisory Skills", "Technical Support", "Cross-selling", "Customer Retention"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Customer Service Associate",
      company: "Response Team",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Handle customer complaints and provide solutions to enhance satisfaction... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Conflict Resolution", "Customer Relations", "Data Entry", "Follow-up"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Customer Service Coordinator",
      company: "Support Hub",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Coordinate customer service activities and maintain service quality standards... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Coordination", "Quality Assurance", "Process Improvement", "Reporting"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Customer Service Consultant",
      company: "Expert Support",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Provide specialized customer support and consultation services... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Consultation", "Expert Knowledge", "Problem Analysis", "Solution Design"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Customer Service Manager",
      company: "Service Leaders",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Manage customer service operations and drive customer satisfaction initiatives... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Management", "Customer Experience", "Strategy", "Performance Metrics"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Customer Service Analyst",
      company: "Service Leaders",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Analyze customer service data and provide insights for service improvement... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Customer Insights", "Reporting", "Customer Insights", "Process Optimization"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Build and maintain scalable infrastructure... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Frontend Developer",
      company: "WebFlow Studios",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Build responsive and interactive web applications... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["React", "Tailwind CSS", "JavaScript", "HTML"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Backend Developer",
      company: "ServerTech Inc.",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Develop robust server-side applications and APIs... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Graphic Designer",
      company: "Creative Agency",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Design visual content for digital and print media... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Photoshop", "Illustrator", "InDesign", "Branding"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Content Writer",
      company: "Content Hub",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Create engaging content for websites and blogs... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Writing", "Content Strategy", "SEO", "Research"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Social Media Manager",
      company: "Brand Boost",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Manage social media presence and engagement... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Social Media", "Content Creation", "Analytics", "Community Management"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Mobile App Developer",
      company: "AppWorks",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Create cross-platform mobile applications... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["React Native", "Flutter", "Android", "iOS"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },
    {
      title: "Marketing Director",
      company: "Growth Solutions",
      jobType: "Full-time",
      location: "Remote",
      salaryRange: "$25,000 - $70,000",
      description: "Lead our marketing team and drive growth initiatives... We are seeking a talented individual to join our dynamic team and contribute to our continued success. This role offers excellent growth opportunities and the chance to work with cutting-edge technologies.",
      requiredSkills: ["Digital Marketing", "Team Leadership", "SEO", "Analytics"],
      benefits: [
        "Competitive salary and benefits package",
        "Health, dental, and vision insurance",
        "401(k) retirement plan with company matching",
        "Flexible work arrangements",
        "Paid time off and holidays",
        "Professional development opportunities"
      ],
      postedTime: "2 days ago"
    },


  ];

  const [state, dispatch] = useReducer(jobReducer, jobsData, initialState);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_FILTERS',
      payload: { ...state.filters, [name]: value },
    });
  };

  const handleShowMore = () => {
    dispatch({ type: 'SHOW_MORE' });
  };

  const handleResetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const handleApply = (jobTitle: string, companyName: string) => {
    console.log(`Applying for ${jobTitle} at ${companyName}`);
    setIsDetailsModalOpen(false);
    setIsModalOpen(true);
  };

  const handleViewDetails = (jobData: any) => {
    setSelectedJob(jobData);
    setIsDetailsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen flex flex-col">

      <FlipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob?.title || "Job Application"}
        companyName={selectedJob?.company || ""}
      >
        <div className="w-full" id="job-application-form">
          <h1 className="text-4xl md:text-5xl font-bold text-red-800 text-center mb-8">WE ARE HIRING!</h1>
          <h2 className="text-2xl md:text-2xl text-black text-center mb-10">Join Our Team</h2>
          <p className="text-red-600 bg-neutral-100 rounded px-4 py-2 text-center mb-8">
            If you're interested in one of our open positions, start by applying here and attaching your resume.
          </p>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-0 md:p-0 flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500"
              autoComplete="name"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500"
              autoComplete="tel"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500"
              autoComplete="email"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500 resize-y"
            />
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-gray-700 cursor-pointer">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01" /></svg>
                Attach Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <span className="text-gray-500 text-sm">Attachments ({attachments.length})</span>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <button
                type="submit"
                className="bg-red-700 text-white font-semibold px-8 py-3 rounded shadow hover:bg-red-800 transition-colors w-full max-w-xs"
              >
                SUBMIT APPLICATION
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-2 text-red-600 hover:underline"
              >
                Cancel
              </button>
              <p className="text-xs text-zinc-600 text-center mt-4">
                This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="hover:underline hover:text-blue-600">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="hover:underline hover:text-blue-600">Terms of Service</a> apply.
              </p>
            </div>
          </form>
        </div>
      </FlipModal>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        job={selectedJob}
        onApply={handleApply}
      />
      )}

      {/* Job Seekers Directory Section */}
      <section className="job-seekers-directory w-full mt-16">
        {/* Hero Section */}
        <div className="directory-hero bg-red-50 py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4">Job Seekers</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Welcome to the Job Seekers section of PathMatch! - where your career journey begins. We're dedicated to transforming your job search into career success.
            </p>
            <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-4">
              <a href="/job-seekers" className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">Browse Jobs</a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Apply Here
              </button>
            </div>
          </div>
        </div>

        {/* Filter/Search Bar */}
        <div className="bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  value={state.filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search jobs or companies..."
                  className="w-full rounded-lg border border-red-200 bg-white py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-colors"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
              </div>
            </div>
            <select
              name="location"
              value={state.filters.location}
              onChange={handleFilterChange}
              className="w-full md:w-56 rounded-lg border border-gray-200 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-colors"
            >
              <option value="">Location</option>
              {allLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <select
              name="jobType"
              value={state.filters.jobType}
              onChange={handleFilterChange}
              className="w-full md:w-56 rounded-lg border border-gray-200 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-colors"
            >
              <option value="">Job Type</option>
              {allJobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="max-w-7xl mx-auto mt-4 text-gray-500 text-base">
            Showing {state.filteredJobs.length} jobs
          </div>
        </div>

        {/* Available Jobs Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {state.visibleJobs.map((job, index) => (
                <JobCard
                  key={index}
                  title={job.title}
                  company={job.company}
                  jobType={job.jobType}
                  location={job.location}
                  salaryRange={job.salaryRange}
                  description={job.description}
                  requiredSkills={job.requiredSkills}
                  postedTime={job.postedTime}
                  onApply={() => {
                    setSelectedJob(job);
                    setIsModalOpen(true);
                  }}
                  onViewDetails={() => handleViewDetails(job)}
                />
              ))}
            </div>
            {state.visibleJobs.length < state.filteredJobs.length && (
              <div className="text-center mt-12">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  onClick={handleShowMore}
                >
                  View More <span className="ml-2">→</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose PathMatch */}
        <div className="why-section py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-black mb-12">Why Job Seekers Choose PathMatch</h2>

            <div className="benefits-grid justify-center grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Benefit 1 */}
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="icon mx-auto mb-4 text-4xl text-blue-500">🔍</div>
                <h3 className="text-xl font-semibold mb-2 ">Smart Job Matching</h3>
                <p className="text-gray-600">
                  Our AI matches you to roles that fit your skills and goals - no more endless scrolling.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="icon mx-auto mb-4 text-4xl text-blue-500">📚</div>
                <h3 className="text-xl font-semibold mb-2">Career Development</h3>
                <p className="text-gray-600">
                  Access courses, certifications, and resources to advance your skills.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="icon mx-auto mb-4 text-4xl text-blue-500">🤝</div>
                <h3 className="text-xl font-semibold mb-2">Personalized Support</h3>
                <p className="text-gray-600">
                  Get resume reviews, interview prep, and 1:1 coaching from experts.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="icon mx-auto mb-4 text-4xl text-blue-500">🌐</div>
                <h3 className="text-xl font-semibold mb-2">Networking Events</h3>
                <p className="text-gray-600">
                  Connect with employers at virtual job fairs and industry meetups.
                </p>
              </div>
            </div>
            {/* Centered FIND OUT MORE button */}
            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="bg-black text-white font-semibold px-10 py-3 rounded shadow hover:bg-red-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => {
                  const form = document.getElementById('job-application-form');
                  if (form) form.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                FIND OUT MORE
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="how-it-works py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-black mb-12">Your Path to Success</h2>

            <div className="steps flex flex-col md:flex-row justify-between items-center">
              {/* Step 1 */}
              <div className="step text-center mb-8 md:mb-0">
                <div className="step-number bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">1</div>
                <h3 className="text-xl font-semibold mb-2">Submit Your Resume</h3>
                <p className="max-w-xs text-zinc-600">Send your resume to potential employers and get hired</p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block text-3xl text-black">→</div>

              {/* Step 2 */}
              <div className="step text-center mb-8 md:mb-0">
                <div className="step-number bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">2</div>
                <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
                <p className="max-w-xs text-zinc-600">Receive personalized job recommendations</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:block text-3xl text-red-500">→</div>

              {/* Step 3 */}
              <div className="step text-center">
                <div className="step-number bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">3</div>
                <h3 className="text-xl font-semibold mb-2">Land Your Role</h3>
                <p className="max-w-xs text-zinc-600">Apply with our support and start your new career</p>
              </div>
            </div>
          </div>
        </div>



        {/* Final CTA */}
        <div className="final-cta py-16 bg-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who found their dream roles through PathMatch
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="/signup" className="bg-white text-red-500 px-6 py-3 rounded-lg hover:text-white font-semibold hover:bg-red-800 transition-colors">Get Started - It's Free</a>
              <button
                type="button"
                className="bg-transparent text-white px-6 py-3 rounded-lg font-semibold border border-white hover:bg-white hover:text-red-800 transition-colors"
                onClick={() => {
                  const form = document.getElementById('job-application-form');
                  if (form) form.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule a Meet
              </button>
            </div>
            <div className="stats flex flex-col sm:flex-row justify-center gap-8">
              <div className="stat">
                <p className="text-4xl font-bold">92%</p>
                <p className="text-blue-200">Job match success rate</p>
              </div>
              <div className="stat">
                <p className="text-4xl font-bold">24h</p>
                <p className="text-blue-200">Avg. first interview time</p>
              </div>
              <div className="stat">
                <p className="text-4xl font-bold">10k+</p>
                <p className="text-blue-200">Careers launched</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobSeekers; 