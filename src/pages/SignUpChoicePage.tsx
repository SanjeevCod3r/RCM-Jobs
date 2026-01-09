import { Link, useNavigate } from 'react-router-dom';
import { 
  BsBriefcaseFill, 
  BsBuilding,
  BsArrowRight,
  BsPeople,
  BsGraphUp,
  BsShieldCheck,
  BsRocket,
  BsTrophy
} from 'react-icons/bs';

const SignUpChoicePage = () => {
  const navigate = useNavigate();

  const handleChoice = (role: 'recruiter' | 'employer') => {
    navigate(`/signup/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse animation-delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Join the{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Future of Hiring
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose your path and unlock powerful tools designed to transform how you connect with talent and opportunities
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Recruiter Card */}
          <div
            onClick={() => handleChoice('recruiter')}
            className="group relative cursor-pointer"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt" />
            
            {/* Main Card */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              {/* Icon Section */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                      <BsBriefcaseFill className="text-white text-2xl" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Recruiter</h2>
                    <p className="text-purple-400 text-sm">Talent Acquisition Pro</p>
                  </div>
                </div>
                <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <BsArrowRight size={24} />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-8 leading-relaxed">
                Connect with top talent and streamline your hiring process with AI-powered tools and intelligent matching algorithms.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <BsPeople className="text-purple-400 text-xl" />
                  <span className="text-gray-300 text-sm">Access 10M+ Candidates</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <BsGraphUp className="text-purple-400 text-xl" />
                  <span className="text-gray-300 text-sm">Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <BsShieldCheck className="text-purple-400 text-xl" />
                  <span className="text-gray-300 text-sm">Verified Profiles</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                  <BsRocket className="text-purple-400 text-xl" />
                  <span className="text-gray-300 text-sm">Quick Post Jobs</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                <div>
                  <p className="text-2xl font-bold text-white">50K+</p>
                  <p className="text-gray-400 text-sm">Active Recruiters</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">2M+</p>
                  <p className="text-gray-400 text-sm">Jobs Posted</p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold py-4 rounded-2xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 group-hover:translate-x-2">
                <span className="text-lg">Start Recruiting</span>
                <BsArrowRight className="transform transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Employer Card */}
          <div
            onClick={() => handleChoice('employer')}
            className="group relative cursor-pointer"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-green-600 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt" />
            
            {/* Main Card */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300">
              {/* Icon Section */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                      <BsBuilding className="text-white text-2xl" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Employer</h2>
                    <p className="text-teal-400 text-sm">Business Builder</p>
                  </div>
                </div>
                <div className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <BsArrowRight size={24} />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-8 leading-relaxed">
                Build your dream team with comprehensive hiring tools, employer branding, and data-driven insights.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                  <BsTrophy className="text-teal-400 text-xl" />
                  <span className="text-gray-300 text-sm">Brand Building</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                  <BsPeople className="text-teal-400 text-xl" />
                  <span className="text-gray-300 text-sm">Team Collaboration</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                  <BsGraphUp className="text-teal-400 text-xl" />
                  <span className="text-gray-300 text-sm">Hiring Analytics</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                  <BsShieldCheck className="text-teal-400 text-xl" />
                  <span className="text-gray-300 text-sm">Secure Platform</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-teal-500/10 to-green-500/10 rounded-xl border border-teal-500/20">
                <div>
                  <p className="text-2xl font-bold text-white">100K+</p>
                  <p className="text-gray-400 text-sm">Companies</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">95%</p>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-teal-500 to-green-600 text-white font-semibold py-4 rounded-2xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 group-hover:translate-x-2">
                <span className="text-lg">Build Your Team</span>
                <BsArrowRight className="transform transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Already part of our community?{' '}
            <Link 
              to="/login" 
              className="text-white font-semibold hover:text-purple-400 transition-colors duration-300 hover:underline"
            >
              Sign in to your account
            </Link>
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </div>
      </div>

      </div>
  );
};

export default SignUpChoicePage;
