import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState('arib@example.com');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone.trim()) {
      setError('Please enter your email or mobile phone number.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    const res = await login(emailOrPhone, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between py-6 px-4">
      <div className="w-full max-w-[360px] mx-auto">
        {/* Brand Logo matching Screenshot 5 */}
        <div className="text-center mb-4">
          <Link to="/" className="inline-flex flex-col items-center">
            <div className="flex items-baseline">
              <span className="text-2xl font-black text-[#131921] font-sans lowercase">amazon</span>
              <span className="text-xs text-gray-500 ml-0.5">.in</span>
            </div>
            <svg className="w-16 h-2 text-[#FF9900] -mt-1" viewBox="0 0 70 8" fill="none">
              <path d="M2 2C22 7 48 7 68 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>

        {/* Auth Box Container */}
        <div className="border border-[#D5D9D9] rounded-lg p-6 shadow-2xs space-y-4">
          <h1 className="text-2xl font-normal text-[#0F1111]">
            Sign in or create account
          </h1>

          {error && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-md flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#0F1111] mb-1">
                Enter mobile number or email
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="email or mobile"
                className="w-full px-3 py-1.5 text-sm border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/30 transition-all"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#0F1111]">
                  Password
                </label>
                <span className="text-[11px] text-[#007185] hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-1.5 pr-9 text-sm border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/30 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F2BD00] disabled:bg-gray-200 text-gray-900 py-2 rounded-lg text-xs font-medium shadow-xs border border-[#FCD200] transition-colors cursor-pointer mt-2"
            >
              {loading ? 'Signing in...' : 'Continue'}
            </button>
          </form>

          {/* Legal Note */}
          <p className="text-[11px] text-gray-600 leading-normal">
            By continuing, you agree to Amazon's{' '}
            <Link to="/" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Conditions of Use
            </Link>{' '}
            and{' '}
            <Link to="/" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Privacy Notice
            </Link>.
          </p>

          <hr className="border-gray-200" />

          {/* Buying for work */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0F1111] block">
              Buying for work?
            </span>
            <Link
              to="/register"
              className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline block"
            >
              Create a free business account
            </Link>
          </div>
        </div>

        {/* New to Amazon divider and register button */}
        <div className="mt-6 text-center">
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-3 text-xs text-gray-500 font-medium">New to Amazon?</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Link
            to="/register"
            className="mt-2 block w-full bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] text-gray-900 py-2 rounded-lg text-xs font-medium shadow-2xs transition-colors"
          >
            Create your Amazon account
          </Link>
        </div>
      </div>

      {/* Footer matching Screenshot 5 */}
      <div className="border-t border-gray-200 pt-6 mt-8 text-center text-[11px] text-gray-600 space-y-2">
        <div className="flex justify-center gap-6 text-[#007185]">
          <Link to="/" className="hover:underline">Conditions of Use</Link>
          <Link to="/" className="hover:underline">Privacy Notice</Link>
          <Link to="/" className="hover:underline">Help</Link>
        </div>
        <p className="text-gray-500">© 1996–2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
};

export default LoginPage;
