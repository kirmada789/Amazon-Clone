import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Passwords must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      navigate('/');
    } else {
      setError(res.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between py-6 px-4">
      <div className="w-full max-w-[360px] mx-auto">
        {/* Brand Logo */}
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

        {/* Registration Card */}
        <div className="border border-[#D5D9D9] rounded-lg p-6 shadow-2xs space-y-4">
          <h1 className="text-2xl font-normal text-[#0F1111]">
            Create Account
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
                Your name
              </label>
              <input
                type="text"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/30 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F1111] mb-1">
                Mobile number or email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/30 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F1111] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <p className="text-[11px] text-gray-500 mt-1">
                Passwords must be at least 6 characters.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F1111] mb-1">
                Re-enter password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/30 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F2BD00] disabled:bg-gray-200 text-gray-900 py-2 rounded-lg text-xs font-medium shadow-xs border border-[#FCD200] transition-colors cursor-pointer mt-3"
            >
              {loading ? 'Creating account...' : 'Create your Amazon account'}
            </button>
          </form>

          {/* Legal Note */}
          <p className="text-[11px] text-gray-600 leading-normal">
            By creating an account, you agree to Amazon's{' '}
            <Link to="/" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Conditions of Use
            </Link>{' '}
            and{' '}
            <Link to="/" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Privacy Notice
            </Link>.
          </p>

          <hr className="border-gray-200" />

          {/* Existing user link */}
          <div className="text-xs text-gray-800">
            Already have an account?{' '}
            <Link to="/login" className="text-[#007185] hover:text-[#c7511f] hover:underline font-semibold">
              Sign in &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default RegisterPage;
