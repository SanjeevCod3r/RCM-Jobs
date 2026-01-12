import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jobCategories } from '@/data/jobCategories';

export const JobCategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Prevent body scroll when dropdown is open
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add/remove body scroll lock when dropdown opens/closes
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift when scrollbar disappears
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCategoryClick = (e: React.MouseEvent, categorySlug: string) => {
    e.preventDefault();
    navigate(`/find-jobs?category=${categorySlug}`);
    setIsOpen(false);
  };

  const handleRoleClick = (e: React.MouseEvent, categorySlug: string, roleSlug: string) => {
    e.preventDefault();
    navigate(`/find-jobs?category=${categorySlug}&role=${roleSlug}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="relative px-3 py-2 text-base font-medium text-textGrayColor transition-colors duration-200 hover:text-primaryColor flex items-center gap-1 group"
      >
        Jobs
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primaryColor transition-all duration-300 group-hover:w-full"></span>
      </button>

      {isOpen && (
        <div 
          className="fixed md:absolute left-4 right-4 md:left-0 md:right-auto md:w-96 mt-2 bg-white rounded-md shadow-2xl border border-gray-200 z-50 overflow-hidden"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 bg-gradient-to-r from-primaryColor to-blue-600">
            <h3 className="text-white font-semibold text-lg">Job Categories</h3>
            <p className="text-white/90 text-sm">Browse jobs by category and role</p>
          </div>
          
          <div 
            className="max-h-[calc(100vh-200px)] md:max-h-[70vh] overflow-y-auto" 
            style={{ scrollbarWidth: 'thin' }}
            onWheel={(e) => e.stopPropagation()}
          >
            {jobCategories.map((category) => (
              <div key={category.slug} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={(e) => handleCategoryClick(e, category.slug)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 font-medium text-gray-800 flex justify-between items-center group transition-colors"
                >
                  {category.title}
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-primaryColor transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="bg-gray-50 pl-6 pr-2 py-2">
                  {category.roles.map((role) => (
                    <button
                      key={role.slug}
                      onClick={(e) => handleRoleClick(e, category.slug, role.slug)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-primaryColor hover:bg-gray-50 transition-colors"
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <Link
              to="/find-jobs"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2.5 bg-primaryColor text-white hover:bg-primaryColor/90 transition-colors"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
