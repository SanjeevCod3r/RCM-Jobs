import { useEffect, useState } from 'react';
import { IoBriefcaseOutline, IoSearchOutline, IoDocumentTextOutline, IoPeopleOutline, IoTrendingUpOutline } from 'react-icons/io5';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    { component: IoBriefcaseOutline, label: 'Jobs' },
    { component: IoSearchOutline, label: 'Search' },
    { component: IoDocumentTextOutline, label: 'Applications' },
    { component: IoPeopleOutline, label: 'Companies' },
    { component: IoTrendingUpOutline, label: 'Career' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const iconTimer = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearInterval(iconTimer);
    };
  }, [icons.length]);

  if (!isLoading) return null;

  const CurrentIconComponent = icons[currentIcon].component;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse rounded-full bg-white/10"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main loader container */}
        <div className="relative flex flex-col items-center space-y-8">
          {/* Rotating ring */}
          <div className="relative">
            <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-white border-r-white/30"></div>
            <div className="absolute inset-0 h-24 w-24 animate-spin rounded-full border-4 border-transparent border-b-white/30 border-l-white/20" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            
            {/* Central icon container */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-white/10"></div>
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white to-white/80 shadow-2xl">
                <CurrentIconComponent size={32} className="text-purple-900 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Job-related text animations */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white animate-pulse">
              RCM Job
            </h1>
            <div className="h-6 overflow-hidden">
              <p 
                className="text-sm text-white/80 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateY(-${currentIcon * 24}px)` }}
              >
                {icons.map((icon, index) => (
                  <div key={index} className="h-6 flex items-center justify-center">
                    Finding your {icon.label.toLowerCase()}...
                  </div>
                ))}
              </p>
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="w-64 h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full bg-gradient-to-r from-white via-white/80 to-white animate-pulse"></div>
          </div>

          {/* Floating job-related icons */}
          <div className="relative h-20 w-20">
            <div className="absolute -top-16 -left-16 animate-bounce" style={{ animationDelay: '0s' }}>
              <IoBriefcaseOutline size={24} className="text-white/40" />
            </div>
            <div className="absolute -top-12 -right-20 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <IoSearchOutline size={20} className="text-white/30" />
            </div>
            <div className="absolute -bottom-14 -left-20 animate-bounce" style={{ animationDelay: '0.4s' }}>
              <IoDocumentTextOutline size={18} className="text-white/35" />
            </div>
            <div className="absolute -bottom-16 -right-16 animate-bounce" style={{ animationDelay: '0.6s' }}>
              <IoPeopleOutline size={22} className="text-white/25" />
            </div>
            <div className="absolute top-0 -left-24 animate-bounce" style={{ animationDelay: '0.8s' }}>
              <IoTrendingUpOutline size={16} className="text-white/30" />
            </div>
          </div>

          {/* Loading dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="h-2 w-2 animate-bounce rounded-full bg-white"
                style={{ animationDelay: `${dot * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
