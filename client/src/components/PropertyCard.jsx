import React from 'react';
import { MapPin, TrendingUp, Users, ShieldCheck } from 'lucide-react';

const PropertyCard = ({ property, isConnected }) => {
  const { title, image_url, location, total_value, token_price, available_tokens } = property;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="glass-card flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image_url} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-dark/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
          Verified Asset
        </div>
        <div className="absolute bottom-3 right-3 bg-bloomberg-orange text-black px-2 py-1 rounded text-xs font-bold">
          {available_tokens > 0 ? 'AVAILABLE' : 'SOLD OUT'}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-bloomberg-orange transition-colors">{title}</h3>
        </div>
        
        <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
          <MapPin size={14} className="text-bloomberg-orange" />
          {location}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-dark-accent/50 p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Valuation</p>
            <p className="text-sm font-mono text-white">{formatCurrency(total_value)}</p>
          </div>
          <div className="bg-dark-accent/50 p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Token Price</p>
            <p className="text-sm font-mono text-bloomberg-green">{formatCurrency(token_price)}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Availability</span>
            <span className="text-white font-mono">{available_tokens.toLocaleString()} Tokens Left</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-bloomberg-orange h-full rounded-full" 
              style={{ width: '65%' }}
            ></div>
          </div>
        </div>
        
        <div className="mt-auto">
          <button 
            disabled={!isConnected}
            className="w-full btn-primary disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-700"
          >
            {isConnected ? 'Buy Fraction' : 'Connect Wallet to Invest'}
          </button>
          <p className="text-[10px] text-center text-gray-500 mt-3 flex items-center justify-center gap-1 uppercase tracking-tight">
            <ShieldCheck size={10} /> Smart Contract Insured • Escrow Protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
