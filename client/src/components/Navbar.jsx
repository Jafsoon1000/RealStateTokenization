import { Wallet, Landmark, ChevronDown, Sun, Moon } from 'lucide-react';
import useStore from '../store/useStore';
import { formatAddress } from '../utils/formatters';

const Navbar = () => {
  const { account, connectWallet, theme, toggleTheme } = useStore();
  
  return (
    <nav className="border-b border-gray-800 bg-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Landmark className="text-bloomberg-orange w-8 h-8" />
            <span className="text-xl font-bold tracking-tighter text-white uppercase">
              Jaf<span className="text-bloomberg-orange">soon</span>
            </span>
            <div className="ml-8 hidden md:flex items-center space-x-6">
              <a href="#" className="text-bloomberg-orange text-sm font-medium border-b-2 border-bloomberg-orange pb-5 mt-5">Marketplace</a>
              <a href="#" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">Portfolio</a>
              <a href="#" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">Analytics</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-dark-accent border border-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-dark-accent border border-gray-800 rounded-full">
              <div className="w-2 h-2 rounded-full bg-bloomberg-green animate-pulse"></div>
              <span className="text-xs font-mono text-gray-400 uppercase">Ethereum Mainnet</span>
            </div>
            
            {account ? (
              <button className="btn-secondary flex items-center gap-2 font-mono text-sm">
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-bloomberg-orange to-bloomberg-blue"></div>
                {formatAddress(account)}
                <ChevronDown size={14} className="text-gray-500" />
              </button>
            ) : (
              <button 
                onClick={connectWallet}
                className="btn-primary flex items-center gap-2"
              >
                <Wallet size={18} />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
