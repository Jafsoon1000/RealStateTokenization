import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, Sun, Moon } from 'lucide-react';
import useStore from '../store/useStore';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useStore();

  const handleLogin = (e) => {
    e.preventDefault();
    // Use environment variable for secure password comparison
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (adminPassword && password === adminPassword) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-bloomberg-orange/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]"></div>
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-dark-accent border border-gray-800 text-gray-400 hover:text-white transition-colors shadow-lg"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-md w-full bg-dark-lighter border border-gray-800 rounded-2xl p-8 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-dark border border-gray-700 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
            <Shield className="text-bloomberg-orange" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Owner Portal</h2>
          <p className="text-gray-500 text-sm mt-2 text-center">Restricted Access. Enter your master password to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
              Master Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-500" size={16} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-dark border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-bloomberg-orange focus:ring-1 focus:ring-bloomberg-orange transition-all placeholder:text-gray-600"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-bold"
          >
            Authenticate <ArrowRight size={16} />
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
           <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-white text-xs transition-colors"
           >
            &larr; Return to public site
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
