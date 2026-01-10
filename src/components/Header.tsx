import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import navLogo from '@/assets/images/header/logo.svg';
import { IoMenuSharp, IoClose, IoBriefcaseOutline, IoBusinessOutline, IoLaptopOutline, IoSchoolOutline, IoNewspaperOutline, IoGameControllerOutline } from 'react-icons/io5';

import useScrollPosition from '@/hook/useScrollPosition';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGameMode, setIsGameMode] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();
  const isScrolled = useScrollPosition(50);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleGameMode = () => {
    if (!isGameMode) {
      setShowQuiz(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
    } else {
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
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      if (score + (answerIndex === questions[currentQuestion].correct ? 1 : 0) >= 2) {
        setTimeout(() => {
          setIsGameMode(true);
          setShowQuiz(false);
          navigate('/learning');
        }, 2000);
      }
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

        {/* Mobile Game Mode Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <IoGameControllerOutline size={16} className={`${isGameMode ? 'text-primaryColor' : 'text-textGrayColor'} transition-colors duration-300`} />
          <button
            onClick={toggleGameMode}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              isGameMode ? 'bg-primaryColor' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                isGameMode ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-xs font-medium ${isGameMode ? 'text-primaryColor' : 'text-textGrayColor'} transition-colors duration-300`}>
            Game
          </span>
        </div>

        {/* Buttons */}
        <div className="hidden items-center gap-3 sm:gap-4 lg:flex">
          {/* Game Mode Toggle */}
          <div className="hidden sm:flex items-center gap-2">
            <IoGameControllerOutline size={16} className={`${isGameMode ? 'text-primaryColor' : 'text-textGrayColor'} transition-colors duration-300`} />
            <button
              onClick={toggleGameMode}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                isGameMode ? 'bg-primaryColor' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                  isGameMode ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-xs sm:text-sm font-medium ${isGameMode ? 'text-primaryColor' : 'text-textGrayColor'} transition-colors duration-300 hidden sm:block`}>
              Game Mode
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
      
      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            {!quizCompleted ? (
              <>
                <div className="mb-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-textDarkColor">
                      🎮 Quick Quiz Challenge!
                    </h3>
                    <span className="text-sm text-textGrayColor">
                      {currentQuestion + 1}/{questions.length}
                    </span>
                  </div>
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div 
                      className="h-full bg-gradient-to-r from-primaryColor to-purple-600 transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-4 text-lg font-medium text-textDarkColor">
                    {questions[currentQuestion].question}
                  </p>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
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
                  {score >= 2 ? 'Congratulations!' : 'Good Try!'}
                </h3>
                <p className="mb-4 text-textGrayColor">
                  {score >= 2 
                    ? `You scored ${score}/${questions.length}! Unlocking learning section...` 
                    : `You scored ${score}/${questions.length}. Try again to unlock!`}
                </p>
                {score < 2 && (
                  <button
                    onClick={resetQuiz}
                    className="rounded-lg bg-primaryColor px-6 py-2 text-white transition-all duration-300 hover:bg-primaryColor/90"
                  >
                    Try Again
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
