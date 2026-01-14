import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiArrowLeft, 
  FiCheckCircle, 
  FiMail,
  FiUpload
} from 'react-icons/fi';
import { companies } from '@/data/companies';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  resume: File | null | string;
  coverLetter: string;
  portfolio: string;
  linkedin: string;
};

const JobDetailsPage = () => {
  const { companyId, jobId } = useParams<{ companyId: string; jobId: string }>();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    portfolio: '',
    linkedin: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const company = companies.find(c => c.id === companyId);
  const job = company?.jobs.find(j => j.id === jobId);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!company || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/companies" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files ? e.target.files[0] : null
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would submit the form data to your backend here
      console.log('Form submitted:', formData);
      
      // Simulate API call
      setTimeout(() => {
        setApplicationSubmitted(true);
      }, 1000);
    }
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for applying to the {job.title} position at {company.name}.
          </p>
          <p className="text-gray-600 mb-8">
            We've received your application and will review it shortly. If your qualifications match our requirements, we'll be in touch with next steps.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate(`/companies/${company.id}`)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to {company.name}
            </button>
            <button
              onClick={() => navigate('/companies')}
              className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse More Companies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Job Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link 
              to={`/companies/${company.id}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to {company.name}
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex flex-wrap items-center mt-2 text-gray-600">
                <span className="flex items-center mr-4">
                  <FiBriefcase className="mr-1.5" />
                  {job.type}
                </span>
                <span className="flex items-center mr-4">
                  <FiMapPin className="mr-1.5" />
                  {company.location}
                </span>
                <span className="flex items-center">
                  <FiDollarSign className="mr-1.5" />
                  {job.salary}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsApplying(true)}
              className="mt-4 md:mt-0 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Job Details */}
          <div className={`lg:w-2/3 ${isApplying ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{job.description}</p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="text-gray-700">{requirement}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="text-gray-700">{responsibility}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">About {company.name}</h3>
                <p className="text-gray-700 mb-4">{company.description}</p>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setIsApplying(true)}
                    className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply for this position
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Jobs</h2>
              <div className="space-y-4">
                {companies.flatMap(c => 
                  c.jobs
                    .filter(j => j.id !== job.id && j.type === job.type)
                    .slice(0, 2)
                    .map(similarJob => ({
                      ...similarJob,
                      company: c
                    }))
                ).slice(0, 3).map((similarJob) => (
                  <div key={`${similarJob.company.id}-${similarJob.id}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900">{similarJob.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{similarJob.company.name}</p>
                    <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-4 gap-y-1">
                      <span className="flex items-center">
                        <FiBriefcase className="mr-1.5" />
                        {similarJob.type}
                      </span>
                      <span className="flex items-center">
                        <FiMapPin className="mr-1.5" />
                        {similarJob.location}
                      </span>
                      <span className="flex items-center">
                        <FiDollarSign className="mr-1.5" />
                        {similarJob.salary}
                      </span>
                    </div>
                    <div className="mt-3">
                      <Link
                        to={`/companies/${similarJob.company.id}/jobs/${similarJob.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Application Form (shown when isApplying is true) */}
          {isApplying && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Apply for {job.title}</h2>
                  <button
                    onClick={() => setIsApplying(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                      Resume <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300">
                      <div className="space-y-1 text-center">
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="resume-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="resume-upload" 
                              name="resume-upload" 
                              type="file" 
                              className="sr-only"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, DOCX up to 5MB
                        </p>
                        {formData.resume && (
                          <p className="text-sm text-green-600 flex items-center justify-center mt-2">
                            <FiCheckCircle className="mr-1.5" />
                            {formData.resume instanceof File ? formData.resume.name : 'Resume uploaded'}
                          </p>
                        )}
                      </div>
                    </div>
                    {errors.resume && (
                      <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={4}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us why you're a good fit for this position..."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio/Website (optional)
                    </label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn Profile (optional)
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit Application
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3">
                    By applying, you agree to our Terms of Service and Privacy Policy. We'll use your information to process your application and contact you about it. You can opt out anytime.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
