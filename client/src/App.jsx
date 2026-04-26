import React, { useEffect } from 'react';
import useStore from './store/useStore';

import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import { BarChart3, Globe, Shield, Zap } from 'lucide-react';

function App() {
  const { properties, account, loading, fetchProperties, checkIfWalletIsConnected, connectWallet } = useStore();

  useEffect(() => {
    fetchProperties();
    checkIfWalletIsConnected();
  }, [fetchProperties, checkIfWalletIsConnected]);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bloomberg-orange/10 border border-bloomberg-orange/20 text-bloomberg-orange text-xs font-bold mb-6">
            <Zap size={14} />
            Institutional Grade RWA Tokenization
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Institutional Real Estate. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bloomberg-orange to-white/60">
              Democratized on Ethereum.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Directly invest in high-yield commercial real estate assets using blockchain technology. 
            Secure, fractional ownership with instant liquidity and transparent verification.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-center gap-4 bg-dark-lighter p-4 rounded-xl border border-gray-800">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <Globe size={24} />
              </div>
              <div>
                <p className="text-white font-bold">$1.2B+</p>
                <p className="text-gray-500 text-xs">Global TVL</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-dark-lighter p-4 rounded-xl border border-gray-800">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-white font-bold">100%</p>
                <p className="text-gray-500 text-xs">Asset Backed</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-dark-lighter p-4 rounded-xl border border-gray-800">
              <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-white font-bold">12.4%</p>
                <p className="text-gray-500 text-xs">Avg. Annual Yield</p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Institutional Inventory</h2>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-bloomberg-green animate-pulse self-center"></div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-tighter">Live Market Data</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-bloomberg-orange border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-mono text-sm">Fetching Assets from Blockchain...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard 
                key={property._id} 
                property={property} 
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Footer / Ticker */}
      <footer className="border-t border-gray-800 bg-dark-lighter mt-12 py-6 overflow-hidden">
        <div className="flex gap-12 animate-infinite-scroll whitespace-nowrap px-4">
          <div className="flex items-center gap-2">
            <span className="ticker-text text-gray-400">ETH/USD</span>
            <span className="ticker-text text-bloomberg-green">$2,451.20 +1.2%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ticker-text text-gray-400">BERLIN-OFFICE-1</span>
            <span className="ticker-text text-white">1,042.15 +0.4%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ticker-text text-gray-400">FRANKFURT-WATER-2</span>
            <span className="ticker-text text-bloomberg-green">512.40 +2.1%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ticker-text text-gray-400">MUNICH-RETAIL-3</span>
            <span className="ticker-text text-red-500">248.90 -0.2%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ticker-text text-gray-400">GLOBAL-RWA-INDEX</span>
            <span className="ticker-text text-bloomberg-green">1,420.50 +0.85%</span>
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-2">
            <span className="ticker-text text-gray-400">ETH/USD</span>
            <span className="ticker-text text-bloomberg-green">$2,451.20 +1.2%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ticker-text text-gray-400">BERLIN-OFFICE-1</span>
            <span className="ticker-text text-white">1,042.15 +0.4%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
