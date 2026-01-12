import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import navLogo from '@/assets/images/header/logo.svg';
import { IoMenuSharp, IoClose, IoBriefcaseOutline, IoBusinessOutline, IoLaptopOutline, IoSchoolOutline, IoNewspaperOutline, IoGameControllerOutline, IoChevronDown } from 'react-icons/io5';
import { jobCategories } from '@/data/jobCategories';
import { JobCategoriesDropdown } from './JobCategoriesDropdown';

import useScrollPosition from '@/hook/useScrollPosition';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGameMode, setIsGameMode] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const isScrolled = useScrollPosition(50);

  // Prevent body scroll when mobile menu, categories, or quiz are open
  useEffect(() => {
    const shouldLockScroll = isMenuOpen || showMobileCategories || showQuiz;
    
    if (shouldLockScroll) {
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = '15px'; // Prevent layout shift when scrollbar disappears
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen, showMobileCategories, showQuiz]);
  
  const toggleMenu = () => {
    // Close mobile categories when toggling menu
    if (showMobileCategories) {
      setShowMobileCategories(false);
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleGameMode = () => {
    if (!isGameMode) {
      // Close mobile menu when entering game mode
      setIsMenuOpen(false);
      setShowMobileCategories(false);
      setShowQuiz(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    } else {
      // Exit game mode
      setIsGameMode(false);
      navigate('/');
    }
  };

  const questions = [
    {
      question: "What is the most important skill for job searching?",
      options: ["Only technical skills", "Communication & networking", "Just having a degree", "Working 24/7"],
      correct: 1,
      explanation: "Communication and networking are crucial for finding opportunities!"
    },
    {
      question: "How many jobs should you apply to per week?",
      options: ["1-2 jobs", "5-10 quality applications", "50+ random applications", "Wait for jobs to find you"],
      correct: 1,
      explanation: "Quality over quantity! 5-10 targeted applications are more effective."
    },
    {
      question: "What makes a great resume?",
      options: ["10+ pages long", "Colorful and fancy fonts", "Tailored to the job, 1-2 pages", "Same for all jobs"],
      correct: 2,
      explanation: "A tailored, concise resume (1-2 pages) gets more attention!"
    },
    {
      question: "When is the best time to follow up after an interview?",
      options: ["Immediately after", "Within 24 hours", "1-2 weeks later", "Never follow up"],
      correct: 1,
      explanation: "Following up within 24 hours shows enthusiasm and professionalism!"
    },
    {
      question: "What should you research before an interview?",
      options: ["Only the job description", "Company culture, recent news, and your interviewers", "Just your salary expectations", "Nothing, be spontaneous"],
      correct: 1,
      explanation: "Researching the company and interviewers shows genuine interest and preparation!"
    },
    {
      question: "How should you handle salary negotiation?",
      options: ["Accept the first offer", "Never discuss salary", "Research market rates and negotiate professionally", "Demand double what they offer"],
      correct: 2,
      explanation: "Research market rates and negotiate professionally to get fair compensation!"
    },
    {
      question: "What's the best way to handle employment gaps?",
      options: ["Hide them completely", "Explain honestly what you learned during that time", "Lie about what you did", "Blame previous employers"],
      correct: 1,
      explanation: "Honesty about gaps and focusing on growth shows integrity and maturity!"
    },
    {
      question: "How important is networking for job searching?",
      options: ["Not important at all", "Somewhat helpful", "Extremely important - most jobs come through referrals", "Only useful for executives"],
      correct: 2,
      explanation: "Networking is crucial! Many positions are filled through referrals and connections!"
    },
    {
      question: "What should you include in a cover letter?",
      options: ["Repeat your entire resume", "A brief, personalized story connecting your experience to the company's needs", "Just say 'see resume'", "Complain about your current job"],
      correct: 1,
      explanation: "A personalized cover letter that connects your story to the company's needs stands out!"
    },
    {
      question: "How should you prepare for virtual interviews?",
      options: ["Show up in pajamas", "Test technology, dress professionally, and minimize distractions", "Don't prepare, be natural", "Use filters and backgrounds to hide your room"],
      correct: 1,
      explanation: "Technical preparation and professional presentation are key for virtual interviews!"
    }
  ];

  const getDailyQuestion = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const questionIndex = dayOfYear % questions.length;
    return questions[questionIndex];
  };

  const dailyQuestion = getDailyQuestion();

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === dailyQuestion.correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setQuizCompleted(true);
    
    if (isCorrect) {
      setTimeout(() => {
        setIsGameMode(true);
        setShowQuiz(false);
        navigate('/learning');
      }, 2000);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    // <header className=""
    <header
      className={`sticky top-0 left-0 z-50 w-full bg-[#F8F8FD] transition-shadow duration-300 ${
        isScrolled ? 'border-b border-gray-200' : ''
      }`}
    >
      <nav className={`container flex items-center justify-between py-3 sm:py-4 ${isGameMode ? 'justify-center' : ''}`}>
        {/* Logo and Menu */}
        <div className={`flex items-center ${isGameMode ? 'gap-4' : 'gap-16'}`}>
          <Link to={isGameMode ? '/learning' : '/'} className="flex cursor-pointer items-center gap-2 transition-transform duration-200 hover:scale-105">
            <div className={`h-8 w-8 rounded-full bg-gradient-to-br from-primaryColor/20 to-primaryColor/10 flex items-center justify-center ${isGameMode ? 'h-7 w-7' : ''}`}>
              <img
                src={navLogo}
                loading="lazy"
                alt="Logo"
                className={`h-5 w-5 object-cover ${isGameMode ? 'h-4 w-4' : ''}`}
              />
            </div>
            <span className={`text-left font-redHatDisplay ${isGameMode ? 'text-lg' : 'text-2xl'} leading-none font-bold tracking-[-0.01em] text-textDarkColor`}>
              {isGameMode ? 'RCM Game' : 'RCM Job'}
            </span>
          </Link>
          {/* Desktop Navigation Links - Hidden in game mode */}
          <ul className={`hidden items-center gap-8 lg:flex ${isGameMode ? 'opacity-0 pointer-events-none' : ''}`}>
            <li>
              <JobCategoriesDropdown />
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
                Community
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Game Mode Toggle - Always visible */}
        <div className={`flex lg:hidden items-center gap-2 ${isGameMode ? 'order-first' : ''} z-50`}>
          <div className="relative">
            <IoGameControllerOutline 
              size={18} 
              className={`absolute -top-1 -left-1 ${isGameMode ? 'text-white animate-pulse' : 'text-gray-400'} transition-all duration-300 z-10`} 
            />
            <button
              onClick={toggleGameMode}
              aria-label={isGameMode ? 'Exit Game Mode' : 'Enter Game Mode'}
              className={`relative h-8 w-14 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primaryColor/50 active:scale-95 ${
                isGameMode 
                  ? 'bg-gradient-to-r from-primaryColor to-purple-600 shadow-lg shadow-primaryColor/30' 
                  : 'bg-gray-200 border border-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-7 w-7 rounded-full bg-white shadow-md transition-all duration-300 transform flex items-center justify-center ${
                  isGameMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                {isGameMode && (
                  <span className="h-2 w-2 rounded-full bg-primaryColor animate-ping"></span>
                )}
              </span>
            </button>
          </div>
          <span className={`text-xs font-bold transition-all duration-300 ${
            isGameMode ? 'text-primaryColor' : 'text-gray-500'
          }`}>
            {isGameMode ? 'Exit' : 'Game'}
          </span>
        </div>

        {/* Buttons */}
        <div className={`hidden items-center gap-3 sm:gap-4 lg:flex ${isGameMode ? 'opacity-0 pointer-events-none' : ''}`}>
          {/* Game Mode Toggle - Always visible */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <IoGameControllerOutline 
                size={18} 
                className={`absolute -top-1 -left-1 ${isGameMode ? 'text-white animate-pulse' : 'text-gray-400'} transition-all duration-300 z-10`} 
              />
              <button
                onClick={toggleGameMode}
                className={`relative h-6 w-12 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primaryColor/50 ${
                  isGameMode 
                    ? 'bg-gradient-to-r from-primaryColor to-purple-600 shadow-lg shadow-primaryColor/30' 
                    : 'bg-gray-200 border border-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-500 transform ${
                    isGameMode ? 'translate-x-6 scale-90' : 'translate-x-0 scale-100'
                  }`}
                >
                  {isGameMode && (
                    <span className="flex h-full w-full items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-primaryColor animate-ping"></span>
                    </span>
                  )}
                </span>
              </button>
            </div>
            <span className={`text-xs sm:text-sm font-bold transition-all duration-300 ${
              isGameMode ? 'text-primaryColor' : 'text-gray-500'
            }`}>
              {isGameMode ? 'Exit Fun Mode' : 'Fun Mode'}
            </span>
          </div>
          
          <Link
            to="/login"
            className="shrink-0 rounded-lg px-3 sm:px-5 py-2.5 text-center font-semibold text-primaryColor transition-all duration-300 hover:bg-primaryColor/10 hover:scale-105 text-sm sm:text-base"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="primary-btn shrink-0 px-3 sm:px-5 py-2.5 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>

        {/* Game Mode Toggle - Always visible when other buttons are hidden */}
        {isGameMode && (
          <div className="hidden lg:flex items-center gap-2 z-50">
            <div className="relative">
              <IoGameControllerOutline 
                size={18} 
                className={`absolute -top-1 -left-1 text-white animate-pulse transition-all duration-300 z-10`} 
              />
              <button
                onClick={toggleGameMode}
                className="relative h-6 w-12 rounded-full bg-gradient-to-r from-primaryColor to-purple-600 shadow-lg shadow-primaryColor/30 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primaryColor/50"
              >
                <span
                  className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-500 transform translate-x-6 scale-90"
                >
                  <span className="flex h-full w-full items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-primaryColor animate-ping"></span>
                  </span>
                </span>
              </button>
            </div>
            <span className="text-xs sm:text-sm font-bold text-primaryColor transition-all duration-300">
              Exit Game Mode
            </span>
          </div>
        )}

        {/* Hamburger Menu - Hidden in game mode */}
        {!isGameMode && !showQuiz && (
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
        )}
      </nav>

      {/* Mobile Navigation Menu - Hidden in game mode */}
      {isMenuOpen && !isGameMode && !showQuiz && (
        <div className="bg-[#F8F8FD] shadow-2xl transition-all duration-300 md:hidden">
          <ul className="flex flex-col p-6 space-y-2">
            <li>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-left text-textGrayColor transition-colors duration-200 hover:bg-primaryColor/10 hover:text-primaryColor rounded-lg"
                onClick={() => setShowMobileCategories(!showMobileCategories)}
              >
                <div className="flex items-center gap-3">
                  <IoBriefcaseOutline size={20} />
                  <span>Jobs</span>
                </div>
                <IoChevronDown className={`transition-transform duration-200 ${showMobileCategories ? 'transform rotate-180' : ''}`} />
              </button>
              {showMobileCategories && (
                <div 
                className="pl-8 pr-2 py-2 space-y-2 max-h-[60vh] overflow-y-auto" 
                style={{ scrollbarWidth: 'thin' }}
                onWheel={(e) => e.stopPropagation()}
              >
                  {jobCategories.map((category) => (
                    <div key={category.slug} className="space-y-1 border-b border-gray-100 last:border-0 pb-2">
                      <Link
                        to={`/find-jobs?category=${category.slug}`}
                        onClick={toggleMenu}
                        className="block px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-primaryColor transition-colors"
                      >
                        {category.title}
                      </Link>
                      <div className="pl-3 space-y-0.5">
                        {category.roles.map((role) => (
                          <Link
                            key={role.slug}
                            to={`/find-jobs?category=${category.slug}&role=${role.slug}`}
                            onClick={toggleMenu}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primaryColor transition-colors"
                          >
                            {role.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link
                      to="/find-jobs"
                      onClick={toggleMenu}
                      className="block w-full text-center px-4 py-2.5 bg-primaryColor text-white hover:bg-primaryColor/90 transition-colors text-sm font-medium"
                    >
                      View All Jobs
                    </Link>
                  </div>
                </div>
              )}
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
                Community
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
      
      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            {!quizCompleted ? (
              <>
                <div className="mb-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-textDarkColor">
                      🎮 Daily Question Challenge!
                    </h3>
                    <span className="text-sm text-textGrayColor">
                      Today's Question
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-4 text-lg font-medium text-textDarkColor">
                    {dailyQuestion.question}
                  </p>
                  <div className="space-y-3">
                    {dailyQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full rounded-lg border border-gray-200 p-3 text-left transition-all duration-300 hover:border-primaryColor hover:bg-primaryColor/5"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className="text-sm text-textGrayColor hover:text-textDarkColor"
                >
                  Cancel Quiz
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-4 text-6xl">
                  {score >= 2 ? '🎉' : '💪'}
                </div>
                <h3 className="mb-2 text-xl font-bold text-textDarkColor">
                  {score > 0 ? 'Correct! Well done!' : 'Not quite right!'}
                </h3>
                <p className="mb-4 text-textGrayColor">
                  {score > 0 
                    ? 'Great job! Unlocking learning section...' 
                    : `The correct answer was: ${dailyQuestion.options[dailyQuestion.correct]}. Try again tomorrow!`}
                </p>
                {score === 0 && (
                  <button
                    onClick={resetQuiz}
                    className="rounded-lg bg-primaryColor px-6 py-2 text-white transition-all duration-300 hover:bg-primaryColor/90"
                  >
                    Close
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
