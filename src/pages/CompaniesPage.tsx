import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiMapPin, FiGlobe, FiUsers, FiCalendar } from 'react-icons/fi';
import { companies } from '@/data/companies';
import type { Company } from '@/data/companies';

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const industries = [...new Set(companies.map(company => company.industry))];
  const locations = [...new Set(companies.map(company => company.location))];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || company.location === locationFilter;
    const matchesIndustry = !industryFilter || company.industry === industryFilter;
    
    return matchesSearch && matchesLocation && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Company</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Discover top companies and explore their job opportunities. Join teams that match your skills and values.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Companies List */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Companies</h2>
        
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No companies found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200">
          <img 
            src={company.coverImage} 
            alt={`${company.name} cover`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-8 left-4">
          <img 
            src={company.logo} 
            alt={`${company.name} logo`} 
            className="w-16 h-16 rounded-lg border-4 border-white bg-white shadow-md"
          />
        </div>
      </div>
      
      <div className="pt-10 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{company.industry}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {company.jobs.length} {company.jobs.length === 1 ? 'opening' : 'openings'}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mt-3 line-clamp-2">{company.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <FiMapPin className="mr-2" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FiUsers className="mr-2" />
            <span>{company.employeeCount} employees</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FiGlobe className="mr-2" />
            <a 
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {company.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FiCalendar className="mr-2" />
            <span>Founded in {company.founded}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Open Positions:</h4>
          <div className="space-y-3">
            {company.jobs.slice(0, 2).map((job) => (
              <div key={job.id} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                <h5 className="font-medium">{job.title}</h5>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FiBriefcase className="mr-1.5" />
                  <span>{job.type}</span>
                  <span className="mx-2">•</span>
                  <FiMapPin className="mr-1.5" />
                  <span>{job.location}</span>
                </div>
                <Link
                  to={`/companies/${company.id}/jobs/${job.id}`}
                  className="inline-block mt-2 text-blue-600 text-sm font-medium hover:underline"
                >
                  View Details & Apply
                </Link>
              </div>
            ))}
            {company.jobs.length > 2 && (
              <Link
                to={`/companies/${company.id}`}
                className="block text-center text-blue-600 text-sm font-medium hover:underline mt-2"
              >
                +{company.jobs.length - 2} more positions
              </Link>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <Link
            to={`/companies/${company.id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            View Company Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
