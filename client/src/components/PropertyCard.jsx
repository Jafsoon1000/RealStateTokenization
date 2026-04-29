import { MapPin, TrendingUp, ShieldCheck, Percent } from 'lucide-react';
import useStore from '../store/useStore';
import { formatCurrency } from '../utils/formatters';

const PropertyCard = ({ property }) => {
  const { account } = useStore();
  const isConnected = !!account;
  const { title, image_url, location, total_value, token_price, available_tokens, yield_percentage, property_type } = property;

  const totalTokens = Math.round(total_value / token_price);
  const soldPercentage = totalTokens > 0 ? Math.round(((totalTokens - available_tokens) / totalTokens) * 100) : 0;

  const typeLabel = {
    commercial: 'Commercial',
    residential: 'Residential',
    industrial: 'Industrial',
    retail: 'Retail',
    'mixed-use': 'Mixed-Use',
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
        <div className="absolute top-3 right-3 bg-dark/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-bloomberg-orange border border-bloomberg-orange/20">
          {typeLabel[property_type] || 'Commercial'}
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
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-dark-accent/50 p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Valuation</p>
            <p className="text-sm font-mono text-white">{formatCurrency(total_value)}</p>
          </div>
          <div className="bg-dark-accent/50 p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Token Price</p>
            <p className="text-sm font-mono text-bloomberg-green">{formatCurrency(token_price)}</p>
          </div>
          <div className="bg-dark-accent/50 p-3 rounded-lg border border-gray-800">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Est. Yield</p>
            <p className="text-sm font-mono text-bloomberg-orange flex items-center gap-1">
              <TrendingUp size={12} />
              {yield_percentage || '—'}%
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Token Sale Progress</span>
            <span className="text-white font-mono">{soldPercentage}% Sold</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-bloomberg-orange to-bloomberg-green h-full rounded-full transition-all duration-700" 
              style={{ width: `${soldPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-600 font-mono">
            <span>{available_tokens.toLocaleString()} tokens left</span>
            <span>{totalTokens.toLocaleString()} total</span>
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
