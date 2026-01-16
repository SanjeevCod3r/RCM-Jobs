import { useState, useEffect } from 'react';
import { FiGift } from 'react-icons/fi';
import Brands from '@/components/Brands';
import Categories from '@/components/Categories';
import Cta from '@/components/Cta';
import FeaturedJobs from '@/components/FeaturedJobs';
import Hero from '@/components/Hero';
import LatestJobs from '@/components/LatestJobs';
import OptionsSection from '@/components/OptionsSection';
import TopCompanies from '@/components/TopCompanies';
import InviteEarnPopup from '@/components/InviteEarnPopup';

const HomePage = () => {
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Show/hide scroll button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <Hero />
      <Brands />
      <OptionsSection />
      <Categories />
      <TopCompanies />
      <Cta />
      <FeaturedJobs />
      <LatestJobs />
      
      {/* Download App Section with Animations */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden md:flex transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            {/* Left side - App Preview with Floating Animation */}
            <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 group-hover:opacity-70 transition-all duration-1000"></div>
              
              {/* Floating phone mockup */}
              <div className="relative w-64 h-96 animate-float">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl border-8 border-white/20 transform transition-all duration-700 group-hover:rotate-1 group-hover:scale-105">
                  <div className="p-4">
                    <div className="h-8 w-16 bg-white/30 rounded-full mb-4 mx-auto group-hover:animate-pulse"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/40 rounded-full w-3/4 mx-auto transition-all duration-300 group-hover:w-5/6"></div>
                      <div className="h-4 bg-white/30 rounded-full w-5/6 mx-auto transition-all duration-500 group-hover:w-2/3"></div>
                      <div className="h-4 bg-white/20 rounded-full w-2/3 mx-auto transition-all duration-700 group-hover:w-1/2"></div>
                    </div>
                    <div className="mt-8 space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="h-12 bg-white/20 rounded-xl transition-all duration-300 group-hover:bg-white/30 group-hover:translate-x-1"
                          style={{ transitionDelay: `${i * 100}ms` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-float-delay"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Right side - Content with Staggered Animations */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 rounded-full opacity-30"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-100 rounded-full opacity-30"></div>
              
              <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Download Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Mobile App</span>
              </h2>
              <p className="text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Get the best job opportunities and apply on the go. Available for both iOS and Android devices.
              </p>
              
              <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-xl">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Easy Application</h3>
                    <p className="text-sm text-gray-600">Apply to jobs with just a few taps</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-xl">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M16.59 7.58L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Notifications</h3>
                    <p className="text-sm text-gray-600">Get real-time updates on your applications</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-xl">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                      <circle cx="12" cy="12" r="1.5"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Job Matching</h3>
                    <p className="text-sm text-gray-600">Find jobs that match your skills</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
                <a 
                  href="#" 
                  className="flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group/button"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.39 2.2 1.32 3.08 1.34.83-.02 1.7-.94 3.06-1.34 2.38-.92 4.35.91 4.91 1.36-3.68 2.37-3 6.72.69 8.65.38.2.64.55.64.96-.03.8-.01 2.1-.03 2.2-.03.17-.14.3-.26.9zM12.03 7.25c-.65-2.5 1.17-4.97 3.03-6.25-2.77 1.98-4.09 6.15-3.03 6.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold leading-none">App Store</div>
                  </div>
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group/button"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 0 1-.61-.92v-18.53a1 1 0 0 1 .61-.922zm1.57 1.098l8.48 8.48 1.69-1.69-8.48-8.48-1.69 1.69zm9.28 10.25l-1.69-1.69 3.27-3.27-7.98-7.98-7.98 7.98 7.98 7.98 7.98-7.98z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-lg font-semibold leading-none">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Floating Invite & Earn Button with Animation */}
      <div className="fixed right-6 bottom-24 z-40 group">
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 -m-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-40 group-hover:animate-ping-slow transition-opacity duration-300"></div>
        
        {/* Tooltip */}
        <div className="absolute right-16 bottom-1/2 transform translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Invite & Earn Rewards
          <div className="absolute right-0 top-1/2 -mr-1 w-2 h-2 transform -translate-y-1/2 rotate-45 bg-gray-900"></div>
        </div>
        
        {/* Main button */}
        <button
          onClick={() => setShowInvitePopup(true)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-bounce-slow"
          aria-label="Invite & Earn"
        >
          <FiGift className="w-6 h-6" />
          {/* Small notification dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></span>
        </button>
      </div>

      {/* Back to top button - only shows when scrolled down */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Invite & Earn Popup */}
      {showInvitePopup && (
        <InviteEarnPopup onClose={() => setShowInvitePopup(false)} />
      )}
    </div>
  );
};

export default HomePage;
