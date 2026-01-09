import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BsEye, 
  BsEyeSlash, 
  BsEnvelope, 
  BsLock,
  BsPerson,
  BsArrowRight,
  BsGoogle,
  BsLinkedin
} from 'react-icons/bs';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse animation-delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Welcome{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Back
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Sign in to access your personalized dashboard and continue your journey with RCM Job
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <BsPerson className="text-purple-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Personalized Experience</h3>
                  <p className="text-gray-400">Tailored job recommendations and insights</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BsLock className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Secure Platform</h3>
                  <p className="text-gray-400">Your data is protected with enterprise-grade security</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                  <BsArrowRight className="text-teal-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Access</h3>
                  <p className="text-gray-400">Instant login from any device, anywhere</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-700">
              <div>
                <p className="text-3xl font-bold text-white">2M+</p>
                <p className="text-gray-400">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-gray-400">Companies</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-gray-400">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            {/* Form Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4">
                  <BsPerson className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-400">Enter your credentials to access your account</p>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-8">
                <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-gray-500 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
                  <BsGoogle className="text-red-500 text-xl" />
                  <span className="text-white font-medium">Continue with Google</span>
                </button>
                <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-gray-500 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
                  <BsLinkedin className="text-blue-500 text-xl" />
                  <span className="text-white font-medium">Continue with LinkedIn</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/50 text-gray-400">Or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-2xl text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Email address"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-4 bg-white/5 border border-gray-600 hover:border-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-2xl text-white placeholder-gray-400 transition-all duration-300"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 bg-white/5 border-gray-600 rounded focus:ring-purple-500 focus:ring-2" />
                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold py-4 rounded-2xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <BsArrowRight className="transform transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center mt-8">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="text-purple-400 font-semibold hover:text-purple-300 transition-colors duration-300"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
