import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BsEye, 
  BsEyeSlash, 
  BsEnvelope, 
  BsLock,
  BsPerson,
  BsBuilding,
  BsPhone,
  BsArrowRight,
  BsGoogle,
  BsLinkedin,
  BsBriefcaseFill
} from 'react-icons/bs';

const RecruiterSignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
      if (value.match(/[0-9]/)) strength++;
      if (value.match(/[^a-zA-Z0-9]/)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/recruiter');
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-600';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <BsBriefcaseFill className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    Join as{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Recruiter
                    </span>
                  </h1>
                  <p className="text-xl text-gray-300 mt-2">Connect with top talent</p>
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Access our network of millions of qualified candidates and streamline your hiring process with powerful tools.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Why Join as Recruiter?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Access 10M+ Candidates</h4>
                    <p className="text-gray-400">Browse through our extensive database of qualified professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">AI-Powered Matching</h4>
                    <p className="text-gray-400">Get intelligent candidate recommendations tailored to your needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Advanced Analytics</h4>
                    <p className="text-gray-400">Track hiring metrics and optimize your recruitment strategy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
              <div>
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-gray-400">Active Recruiters</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">2M+</p>
                <p className="text-gray-400">Jobs Posted</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-400">Start recruiting top talent today</p>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-gray-500 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                  <BsGoogle className="text-red-500 text-lg" />
                  <span className="text-white text-sm font-medium">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-gray-500 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                  <BsLinkedin className="text-blue-500 text-lg" />
                  <span className="text-white text-sm font-medium">LinkedIn</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/50 text-gray-400">Or sign up with email</span>
                </div>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <BsPerson className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <BsPerson className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Phone number"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsBuilding className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Company name"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsBriefcaseFill className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Job title"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      {passwordStrength === 0 && 'Very weak'}
                      {passwordStrength === 1 && 'Weak'}
                      {passwordStrength === 2 && 'Fair'}
                      {passwordStrength === 3 && 'Good'}
                      {passwordStrength === 4 && 'Strong'}
                    </p>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsLock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 bg-white/5 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading || !formData.agreeToTerms}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold py-4 rounded-2xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Recruiter Account
                      <BsArrowRight className="transform transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Back Link */}
              <div className="text-center mt-6">
                <Link 
                  to="/signup" 
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                >
                  ← Back to role selection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSignUpPage;
