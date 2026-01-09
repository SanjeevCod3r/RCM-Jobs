import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BsBriefcaseFill, 
  BsSearch, 
  BsBook,
  BsArrowRight
} from 'react-icons/bs';

const OptionsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const options = [
    {
      id: 1,
      icon: BsBriefcaseFill,
      title: "I am Hiring",
      description: "Post a verified requirement and receive proposals from certified billers and coders.",
      buttonText: "Post Requirement →",
      link: "/post-requirement",
      gradient: "from-blue-500 to-purple-600",
      bgPattern: "bg-gradient-to-br from-blue-50 to-purple-50"
    },
    {
      id: 2,
      icon: BsSearch,
      title: "I want Work",
      description: "Find high-paying contracts, apply with your scorecard, and get gamified job selections.",
      buttonText: "Browse Jobs →",
      link: "/find-jobs",
      gradient: "from-green-500 to-teal-600",
      bgPattern: "bg-gradient-to-br from-green-50 to-teal-50"
    },
    {
      id: 3,
      icon: BsBook,
      title: "RCM Academy & More",
      description: "Access crash courses, job guarantees, and different earning platforms.",
      buttonText: "Explore Academy →",
      link: "/academy",
      gradient: "from-orange-500 to-red-600",
      bgPattern: "bg-gradient-to-br from-orange-50 to-red-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-textDarkColor mb-4">
            What brings you here today?
          </h2>
          <p className="text-lg text-textGrayColor max-w-2xl mx-auto">
            Choose your path and let us help you achieve your professional goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                  className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  hoveredCard === option.id ? 'z-10' : 'z-0'
                }`}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 ${option.bgPattern} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Main Card */}
                <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden ${
                  hoveredCard === option.id ? 'ring-2 ring-offset-2 ring-primaryColor/20' : ''
                }`}>
                  {/* Animated Gradient Border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                  
                  {/* Card Content */}
                  <div className="relative p-8">
                    {/* Icon with Animation */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${option.gradient} text-white mb-6 transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                      <Icon size={28} className="transform transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-textDarkColor mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primaryColor group-hover:to-secondaryColor transition-all duration-300">
                      {option.title}
                    </h3>

                    {/* Description */}
                    <p className="text-textGrayColor mb-6 leading-relaxed">
                      {option.description}
                    </p>

                    {/* Button */}
                    <Link
                      to={option.link}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${option.gradient} text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:translate-x-1`}
                    >
                      <span>{option.buttonText}</span>
                      <BsArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Floating Particles Animation */}
                {hoveredCard === option.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-primaryColor rounded-full animate-pulse" />
                    <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-secondaryColor rounded-full animate-pulse" />
                    <div className="absolute top-12 left-8 w-1 h-1 bg-accentColor rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-textGrayColor mb-4">
            Not sure where to start?{' '}
            <Link to="/help" className="text-primaryColor font-semibold hover:underline">
              Get guidance →
            </Link>
          </p>
        </div>
      </div>

      </section>
  );
};

export default OptionsSection;
