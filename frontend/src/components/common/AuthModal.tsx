import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode, login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (authModalMode === 'login') {
        await login(email, password);
      } else {
        await register({ email, password, full_name: fullName, phone });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillAdminCredentials = () => {
    setAuthModalMode('login');
    setEmail('admin@vaishnokarthik.com');
    setPassword('Admin@VK2026');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#EAE2D5] overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#785338] hover:bg-[#F3EDE2] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
            Vaishno Karthik
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#1B3D2B] mt-1">
            {authModalMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#785338] mt-1">
            {authModalMode === 'login'
              ? 'Sign in to access your orders and saved addresses'
              : 'Join to track orders and enjoy personalized convenience'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex bg-[#F3EDE2] p-1 rounded-2xl mb-6 border border-[#EAE2D5]">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authModalMode === 'login'
                ? 'bg-[#1B3D2B] text-white shadow-xs'
                : 'text-[#785338] hover:text-[#1B3D2B]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              authModalMode === 'register'
                ? 'bg-[#1B3D2B] text-white shadow-xs'
                : 'text-[#785338] hover:text-[#1B3D2B]'
            }`}
          >
            New Customer
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authModalMode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-[#4A3B32] mb-1">Full Name *</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-[#A89F91]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Karthik Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B] focus:ring-1 focus:ring-[#1B3D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A3B32] mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#A89F91]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9848856787"
                    className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B] focus:ring-1 focus:ring-[#1B3D2B]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-[#4A3B32] mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#A89F91]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B] focus:ring-1 focus:ring-[#1B3D2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4A3B32] mb-1">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#A89F91]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EAE2D5] text-sm focus:outline-hidden focus:border-[#1B3D2B] focus:ring-1 focus:ring-[#1B3D2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#1B3D2B] text-white font-semibold text-sm hover:bg-[#2A543A] active:scale-98 transition-all shadow-md disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Processing...' : authModalMode === 'login' ? 'Sign In to Account' : 'Create Free Account'}
          </button>
        </form>

        {/* Quick Admin Credential Helper */}
        <div className="mt-6 pt-4 border-t border-[#EAE2D5] text-center">
          <p className="text-xs text-[#785338] mb-2">Reviewer / Admin Access:</p>
          <button
            type="button"
            onClick={fillAdminCredentials}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A059]/15 text-[#1B3D2B] text-xs font-semibold hover:bg-[#C5A059]/30 transition-colors border border-[#C5A059]/30"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            Fill Admin Credentials (admin@vaishnokarthik.com)
          </button>
        </div>

      </div>
    </div>
  );
};
