import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiGlobe, FiUsers, FiCalendar, FiBriefcase, FiClock, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { companies } from '@/data/companies';
import type { JobPosting } from '@/data/companies';

const CompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const company = companies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Company not found</h2>
          <p className="text-gray-600 mb-6">The company you're looking for doesn't exist or has been removed.</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Company Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-24 h-24 rounded-lg border border-gray-200 p-2"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                  <p className="text-lg text-gray-600 mt-1">{company.industry}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <FiGlobe className="mr-2" />
                    Visit Website
                  </a>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <FiMapPin className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{company.location}</span>
                </div>
                <div className="flex items-center">
                  <FiUsers className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{company.employeeCount} employees</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="text-gray-500 mr-2" />
                  <span className="text-gray-700">Founded in {company.founded}</span>
                </div>
                <div className="flex items-center">
                  <FiBriefcase className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{company.jobs.length} open positions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Company Info */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {company.name}</h2>
              <p className="text-gray-700 leading-relaxed">{company.description}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Company Culture</h3>
              <p className="text-gray-700 mb-4">
                At {company.name}, we foster a culture of innovation, collaboration, and continuous learning. 
                Our team is passionate about {company.industry.toLowerCase()} and committed to making a positive impact.
              </p>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Benefits & Perks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Competitive salary',
                    'Health insurance',
                    'Flexible work hours',
                    'Remote work options',
                    'Professional development',
                    'Team events',
                    'Stock options',
                    'Generous vacation',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Open Positions</h2>
              
              {company.jobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No open positions at the moment.</p>
                  <p className="text-gray-500 text-sm mt-2">Check back later for new opportunities.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {company.jobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500 gap-x-4">
                            <span className="flex items-center">
                              <FiBriefcase className="mr-1.5" />
                              {job.type}
                            </span>
                            <span className="flex items-center">
                              <FiMapPin className="mr-1.5" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <FiDollarSign className="mr-1.5" />
                              {job.salary}
                            </span>
                            <span className="flex items-center">
                              <FiClock className="mr-1.5" />
                              Posted {job.posted}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/companies/${company.id}/jobs/${job.id}`}
                          className="mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Company Info */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Website</h4>
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Industry</h4>
                  <p className="text-gray-900">{company.industry}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Company Size</h4>
                  <p className="text-gray-900">{company.employeeCount} employees</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="text-gray-900">{company.location}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Founded</h4>
                  <p className="text-gray-900">{company.founded}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/companies"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FiArrowLeft className="mr-2" />
                  Back to Companies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
