import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import navLogo from '@/assets/images/header/logo.svg';
import { IoMenuSharp, IoClose, IoBriefcaseOutline, IoBusinessOutline, IoLaptopOutline, IoSchoolOutline, IoNewspaperOutline } from 'react-icons/io5';

import useScrollPosition from '@/hook/useScrollPosition';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(50);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // <header className=""
    <header
      className={`sticky top-0 left-0 z-50 w-full bg-[#F8F8FD] transition-shadow duration-300 ${
        isScrolled ? 'border-b border-gray-200' : ''
      }`}
    >
      <nav className="container flex items-center justify-between py-6">
        {/* Logo and Menu */}
        <div className="flex items-center gap-16">
          <Link to="/" className="flex cursor-pointer items-center gap-3 transition-transform duration-200 hover:scale-105">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primaryColor/20 to-primaryColor/10 flex items-center justify-center">
              <img
                src={navLogo}
                loading="lazy"
                alt="Logo"
                className="h-6 w-6 object-cover"
              />
            </div>
            <span className="text-left font-redHatDisplay text-2xl leading-9 font-bold tracking-[-0.01em] text-textDarkColor">
              RCM Job
            </span>
          </Link>
          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            <li>
              <NavLink 
                to="/find-jobs" 
                className="relative px-3 py-2 text-base font-medium text-textGrayColor transition-colors duration-200 hover:text-primaryColor after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primaryColor after:transition-all after:duration-300 hover:after:w-full"
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/companies" 
                className="relative px-3 py-2 text-base font-medium text-textGrayColor transition-colors duration-200 hover:text-primaryColor after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primaryColor after:transition-all after:duration-300 hover:after:w-full"
              >
                Companies
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/freelancing" 
                className="relative px-3 py-2 text-base font-medium text-textGrayColor transition-colors duration-200 hover:text-primaryColor after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primaryColor after:transition-all after:duration-300 hover:after:w-full"
              >
                Freelancing
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/rcm-academy" 
                className="relative px-3 py-2 text-base font-medium text-textGrayColor transition-colors duration-200 hover:text-primaryColor after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primaryColor after:transition-all after:duration-300 hover:after:w-full"
              >
                RCM Academy
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/blog" 
                className="relative px-3 py-2 text-base font-medium text-textGrayColor transition-colors duration-200 hover:text-primaryColor after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primaryColor after:transition-all after:duration-300 hover:after:w-full"
              >
                Blog
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="shrink-0 rounded-lg px-5 py-2.5 text-center font-semibold text-primaryColor transition-all duration-300 hover:bg-primaryColor/10 hover:scale-105"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="primary-btn shrink-0 px-5 py-2.5 transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-[#5533ff13] text-base shadow-[0px_0px_5px_#5533ff04_inset] transition duration-300 active:border-primaryColor/70 md:hidden"
          onClick={toggleMenu}
          type="button"
        >
          {isMenuOpen ? (
            <IoClose size={20} className="opacity-70 hover:opacity-100" />
          ) : (
            <IoMenuSharp size={20} className="opacity-70 hover:opacity-100" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="bg-[#F8F8FD] shadow-2xl transition-all duration-300 md:hidden">
          <ul className="flex flex-col p-6 space-y-2">
            <li>
              <NavLink
                to="/find-jobs"
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-textGrayColor transition-colors duration-200 hover:bg-primaryColor/10 hover:text-primaryColor rounded-lg"
                onClick={toggleMenu}
              >
                <IoBriefcaseOutline size={20} />
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/companies"
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-textGrayColor transition-colors duration-200 hover:bg-primaryColor/10 hover:text-primaryColor rounded-lg"
                onClick={toggleMenu}
              >
                <IoBusinessOutline size={20} />
                Companies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/freelancing"
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-textGrayColor transition-colors duration-200 hover:bg-primaryColor/10 hover:text-primaryColor rounded-lg"
                onClick={toggleMenu}
              >
                <IoLaptopOutline size={20} />
                Freelancing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rcm-academy"
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-textGrayColor transition-colors duration-200 hover:bg-primaryColor/10 hover:text-primaryColor rounded-lg"
                onClick={toggleMenu}
              >
                <IoSchoolOutline size={20} />
                RCM Academy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-textGrayColor transition-colors duration-200 hover:bg-primaryColor/10 hover:text-primaryColor rounded-lg"
                onClick={toggleMenu}
              >
                <IoNewspaperOutline size={20} />
                Blog
              </NavLink>
            </li>
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
              <li>
                <Link
                  to="/login"
                  className="w-full rounded-lg px-4 py-3 font-semibold text-primaryColor transition-all duration-300 hover:bg-primaryColor/10"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className="primary-btn w-full py-3 transition-all duration-300 hover:scale-[1.02]"
                >
                  Sign Up
                </Link>
              </li>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
