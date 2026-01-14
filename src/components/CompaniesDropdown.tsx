import { useState } from 'react';
import { IoLocationOutline, IoChevronDown } from 'react-icons/io5';

const popularLocations = [
  { id: 1, name: 'San Francisco, CA', jobs: 1245 },
  { id: 2, name: 'New York, NY', jobs: 1987 },
  { id: 3, name: 'Austin, TX', jobs: 876 },
  { id: 4, name: 'Seattle, WA', jobs: 1102 },
  { id: 5, name: 'Boston, MA', jobs: 765 },
];

const topHiringCompanies = [
  { id: 1, name: 'Google', location: 'Mountain View, CA', jobs: 245 },
  { id: 2, name: 'Microsoft', location: 'Redmond, WA', jobs: 198 },
  { id: 3, name: 'Amazon', location: 'Seattle, WA', jobs: 312 },
  { id: 4, name: 'Meta', location: 'Menlo Park, CA', jobs: 178 },
  { id: 5, name: 'Netflix', location: 'Los Gatos, CA', jobs: 87 },
];

const CompaniesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [showCompanies, setShowCompanies] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowCompanies(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowCompanies(true);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 rounded-lg px-4 py-2 text-base font-medium text-textGrayColor transition-colors duration-200 hover:bg-gray-100 hover:text-primaryColor"
      >
        Companies
        <IoChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-4">
            {!showCompanies ? (
              <>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">Popular Locations</h3>
                <div className="space-y-2">
                  {popularLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.name)}
                      className="flex w-full items-center justify-between rounded-md p-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <IoLocationOutline className="mr-2 text-primaryColor" />
                        <span>{location.name}</span>
                      </div>
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600">
                        {location.jobs.toLocaleString()} jobs
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Top Companies in {selectedLocation}
                  </h3>
                  <button
                    onClick={() => setShowCompanies(false)}
                    className="text-xs text-primaryColor hover:underline"
                  >
                    ← Back to locations
                  </button>
                </div>
                <div className="space-y-3">
                  {topHiringCompanies.map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center justify-between rounded-md border border-gray-100 p-3 hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{company.name}</h4>
                        <p className="flex items-center text-xs text-gray-500">
                          <IoLocationOutline className="mr-1" />
                          {company.location}
                        </p>
                      </div>
                      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        {company.jobs} jobs
                      </span>
                    </div>
                  ))}
                  <button className="mt-2 w-full rounded-md bg-primaryColor py-2 text-sm font-medium text-white hover:bg-primaryColor/90">
                    View all companies in {selectedLocation}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesDropdown;
