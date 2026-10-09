import { X, Lock, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Mock successful login session
      onLoginSuccess(email.split('@')[0]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop shadow mask overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Box Container */}
      <div className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-neutral-100 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 p-1 rounded-lg text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700 transition-colors">
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Branding Header */}
        <div className="text-center mb-6 mt-2">
          <span className="text-3xl font-serif-theobroma text-[#d9658b] font-bold tracking-tight lowercase">theobroma</span>
          <h2 className="text-sm font-bold text-gray-800 tracking-wider uppercase mt-3">Welcome Back</h2>
          <p className="text-[11px] text-neutral-400 mt-1">Sign in to your sweet account dashboard</p>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#d9658b]/50 focus:bg-white transition-all" 
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 stroke-[1.5]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Password</label>
              <button type="button" className="text-[10px] text-[#d9658b] font-bold hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#d9658b]/50 focus:bg-white transition-all" 
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 stroke-[1.5]" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#d9658b] hover:bg-[#c55479] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl shadow-md shadow-[#d9658b]/20 flex items-center justify-center gap-1.5 transition-all duration-200 mt-2">
            Sign In <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </form>

        <div className="text-center mt-5 pt-4 border-t border-neutral-100 text-[11px] text-neutral-400">
          Don't have an account? <button className="text-[#d9658b] font-bold hover:underline">Register here</button>
        </div>

      </div>
    </div>
  );
}
