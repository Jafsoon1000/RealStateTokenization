import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  DollarSign, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  ChevronRight, 
  Globe, 
  ArrowUpRight, 
  Compass, 
  Calendar 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

// Mock data for historical TVL based on different timeframes
const timeframeData = {
  '1D': [
    { label: '00:00', value: 1240000000 },
    { label: '04:00', value: 1241200000 },
    { label: '08:00', value: 1242500000 },
    { label: '12:00', value: 1243800000 },
    { label: '16:00', value: 1244900000 },
    { label: '20:00', value: 1245820000 },
  ],
  '1W': [
    { label: 'Mon', value: 1228000000 },
    { label: 'Tue', value: 1231000000 },
    { label: 'Wed', value: 1235000000 },
    { label: 'Thu', value: 1239000000 },
    { label: 'Fri', value: 1242000000 },
    { label: 'Sat', value: 1244000000 },
    { label: 'Sun', value: 1245820000 },
  ],
  '1M': [
    { label: 'Day 1', value: 1195000000 },
    { label: 'Day 5', value: 1205000000 },
    { label: 'Day 10', value: 1212000000 },
    { label: 'Day 15', value: 1224000000 },
    { label: 'Day 20', value: 1231000000 },
    { label: 'Day 25', value: 1239000000 },
    { label: 'Day 30', value: 1245820000 },
  ],
  '3M': [
    { label: 'Mar W1', value: 1110000000 },
    { label: 'Mar W3', value: 1130000000 },
    { label: 'Apr W1', value: 1155000000 },
    { label: 'Apr W3', value: 1180000000 },
    { label: 'May W1', value: 1205000000 },
    { label: 'May W3', value: 1245820000 },
  ],
  '1Y': [
    { label: 'Jun 25', value: 850000000 },
    { label: 'Aug 25', value: 920000000 },
    { label: 'Oct 25', value: 980000000 },
    { label: 'Dec 25', value: 1080000000 },
    { label: 'Feb 26', value: 1150000000 },
    { label: 'Apr 26', value: 1245820000 },
  ],
  'ALL': [
    { label: 'Q1 2024', value: 120000000 },
    { label: 'Q3 2024', value: 340000000 },
    { label: 'Q1 2025', value: 680000000 },
    { label: 'Q3 2025', value: 950000000 },
    { label: 'Q1 2026', value: 1120000000 },
    { label: 'Q2 2026', value: 1245820000 },
  ],
};

// Donut chart asset distribution
const categories = [
  { name: 'Commercial', value: 35, color: '#ff9900', count: 18 },
  { name: 'Residential', value: 25, color: '#3b82f6', count: 12 },
  { name: 'Industrial', value: 20, color: '#10b981', count: 6 },
  { name: 'Retail', value: 10, color: '#a855f7', count: 4 },
  { name: 'Mixed-Use', value: 10, color: '#f43f5e', count: 2 },
];

const securityMetrics = [
  {
    title: 'Multi-Sig Vault',
    value: '3/5 Gnosis Safe',
    desc: 'Secured institutional vault protocol',
    icon: ShieldCheck,
    color: 'text-bloomberg-orange bg-bloomberg-orange/10 border-bloomberg-orange/20',
  },
  {
    title: 'CertiK Security Audit',
    value: '98/100 Rating',
    desc: 'Audited & verified smart contracts',
    icon: Cpu,
    color: 'text-bloomberg-green bg-bloomberg-green/10 border-bloomberg-green/20',
  },
  {
    title: 'Avg. Transaction Cost',
    value: '0.00045 ETH',
    desc: 'Optimized ERC-20 batch gas execution',
    icon: Activity,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
  {
    title: 'Oracle Synchrony',
    value: '100% (Chainlink)',
    desc: 'Real-time property value updates',
    icon: Globe,
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
];

const Analytics = () => {
  const { properties, fetchProperties, theme } = useStore();
  const [timeframe, setTimeframe] = useState('1M');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('yield'); // 'yield' or 'funding'

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const currentChartData = timeframeData[timeframe];
  
  // Calculate SVG dimensions for the TVL line chart
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const minVal = Math.min(...currentChartData.map(d => d.value)) * 0.98;
  const maxVal = Math.max(...currentChartData.map(d => d.value)) * 1.01;
  const valRange = maxVal - minVal;

  // Convert points to SVG coordinates
  const getCoordinates = () => {
    return currentChartData.map((d, index) => {
      const x = paddingX + (index / (currentChartData.length - 1)) * (width - 2 * paddingX);
      const y = height - paddingY - ((d.value - minVal) / valRange) * (height - 2 * paddingY);
      return { x, y, label: d.label, value: d.value };
    });
  };

  const coords = getCoordinates();

  // Create SVG path string
  const linePath = coords.reduce((path, pt, i) => {
    return path + `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }, '');

  // Create closed SVG path string for filled area
  const areaPath = linePath ? `${linePath} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z` : '';

  // Handle line chart hover
  const handleMouseMove = (e) => {
    const svgRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    
    // Convert to SVG coordinates space
    const svgMouseX = (mouseX / svgRect.width) * width;
    
    // Find closest point
    let closestPt = coords[0];
    let minDiff = Math.abs(coords[0].x - svgMouseX);
    
    coords.forEach(pt => {
      const diff = Math.abs(pt.x - svgMouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestPt = pt;
      }
    });

    setHoveredPoint(closestPt);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Donut chart stroke variables
  const radius = 60;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  // Get active category for central text display
  const activeCategory = hoveredCategory || categories[0];

  // Dynamic values based on selected timeframe
  const displayTVL = hoveredPoint ? hoveredPoint.value : 1245820000;
  const displayLabel = hoveredPoint ? hoveredPoint.label : `Live Market Capitalization`;

  // Sort properties by yield or funding progress
  const sortedProperties = [...properties].sort((a, b) => {
    if (activeTab === 'yield') {
      return b.yield_percentage - a.yield_percentage;
    } else {
      const aFunding = ((a.total_value / a.token_price - a.available_tokens) / (a.total_value / a.token_price)) * 100;
      const bFunding = ((b.total_value / b.token_price - b.available_tokens) / (b.total_value / b.token_price)) * 100;
      return bFunding - aFunding;
    }
  });

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-bloomberg-orange/10 border border-bloomberg-orange/20 text-bloomberg-orange text-xs font-bold mb-3 uppercase tracking-wider">
              <Activity size={12} className="animate-pulse" /> Institutional Terminal
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Real-World Asset Analytics
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Live cryptographic data feeds, yield indexes, and compliance matrices.
            </p>
          </div>
          
          {/* Timeframe Selectors */}
          <div className="flex bg-dark-lighter border border-gray-800 rounded-lg p-1">
            {Object.keys(timeframeData).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setTimeframe(tf);
                  setHoveredPoint(null);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
                  timeframe === tf 
                    ? 'bg-bloomberg-orange text-black font-extrabold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Key Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-lighter border border-gray-800 rounded-xl p-5 flex items-start gap-4 hover:border-gray-700 transition-colors">
            <div className="p-3 bg-bloomberg-orange/10 rounded-lg text-bloomberg-orange">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Value Locked</p>
              <h3 className="text-xl font-bold text-white font-mono mt-1">$1.24B</h3>
              <p className="text-xs text-bloomberg-green font-mono mt-1 flex items-center gap-0.5">
                <ArrowUpRight size={12} /> +12.4% <span className="text-gray-600 text-[10px] uppercase font-bold">30d</span>
              </p>
            </div>
          </div>

          <div className="bg-dark-lighter border border-gray-800 rounded-xl p-5 flex items-start gap-4 hover:border-gray-700 transition-colors">
            <div className="p-3 bg-green-500/10 rounded-lg text-bloomberg-green">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Average RWA Return</p>
              <h3 className="text-xl font-bold text-white font-mono mt-1">10.25%</h3>
              <p className="text-xs text-bloomberg-green font-mono mt-1 flex items-center gap-0.5">
                <ArrowUpRight size={12} /> +0.6% <span className="text-gray-600 text-[10px] uppercase font-bold">30d</span>
              </p>
            </div>
          </div>

          <div className="bg-dark-lighter border border-gray-800 rounded-xl p-5 flex items-start gap-4 hover:border-gray-700 transition-colors">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Platform Investors</p>
              <h3 className="text-xl font-bold text-white font-mono mt-1">14,208</h3>
              <p className="text-xs text-bloomberg-green font-mono mt-1 flex items-center gap-0.5">
                <ArrowUpRight size={12} /> +8.7% <span className="text-gray-600 text-[10px] uppercase font-bold">30d</span>
              </p>
            </div>
          </div>

          <div className="bg-dark-lighter border border-gray-800 rounded-xl p-5 flex items-start gap-4 hover:border-gray-700 transition-colors">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
              <Compass size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Properties Tokenized</p>
              <h3 className="text-xl font-bold text-white font-mono mt-1">42 Assets</h3>
              <p className="text-xs text-bloomberg-green font-mono mt-1 flex items-center gap-0.5">
                <ArrowUpRight size={12} /> +3 <span className="text-gray-600 text-[10px] uppercase font-bold">This Month</span>
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Historical TVL Volume Line Chart */}
          <div className="lg:col-span-2 bg-dark-lighter border border-gray-800 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Cryptographic Valuation Curve</h3>
                <p className="text-xs text-gray-500 mt-0.5">Historical trend for asset tokenization pool</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{displayLabel}</p>
                <p className="text-xl font-extrabold text-white font-mono tracking-tight mt-0.5">
                  {formatCurrency(displayTVL)}
                </p>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="relative w-full h-[240px] select-none">
              <svg 
                className="w-full h-full" 
                viewBox={`0 0 ${width} ${height}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  {/* Glowing line gradient */}
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff9900" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#ff9900" stopOpacity="0.1"/>
                  </linearGradient>
                  {/* Background shadow gradient */}
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff9900" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#ff9900" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                  const y = paddingY + ratio * (height - 2 * paddingY);
                  return (
                    <line 
                      key={index} 
                      x1={paddingX} 
                      y1={y} 
                      x2={width - paddingX} 
                      y2={y} 
                      stroke="#1f2937" 
                      strokeWidth="1" 
                      strokeDasharray="4"
                    />
                  );
                })}

                {/* Filled Area */}
                {areaPath && (
                  <path 
                    d={areaPath} 
                    fill="url(#areaGrad)" 
                    className="transition-all duration-300"
                  />
                )}

                {/* Glowing Trend Line */}
                {linePath && (
                  <path 
                    d={linePath} 
                    fill="none" 
                    stroke="#ff9900" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                    className="transition-all duration-300 filter drop-shadow-[0_4px_6px_rgba(255,153,0,0.3)]"
                  />
                )}

                {/* Dots on Chart */}
                {coords.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint && hoveredPoint.label === pt.label ? "6" : "3.5"}
                    fill={hoveredPoint && hoveredPoint.label === pt.label ? "#ffffff" : "#ff9900"}
                    stroke="#0a0a0b"
                    strokeWidth="1.5"
                    className="transition-all duration-200 cursor-pointer"
                  />
                ))}

                {/* Interactive Tooltip Cursor */}
                {hoveredPoint && (
                  <>
                    <line 
                      x1={hoveredPoint.x} 
                      y1={paddingY} 
                      x2={hoveredPoint.x} 
                      y2={height - paddingY} 
                      stroke="#ff9900" 
                      strokeWidth="1.5" 
                      strokeDasharray="2"
                    />
                    <circle
                      cx={hoveredPoint.x}
                      cy={hoveredPoint.y}
                      r="9"
                      fill="#ff9900"
                      fillOpacity="0.2"
                    />
                  </>
                )}

                {/* X Axis Labels */}
                {coords.map((pt, i) => (
                  <text
                    key={i}
                    x={pt.x}
                    y={height - 8}
                    fill="#6b7280"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none font-bold"
                  >
                    {pt.label}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Asset Type Allocation Donut Chart */}
          <div className="bg-dark-lighter border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Asset Concentration</h3>
              <p className="text-xs text-gray-500 mt-0.5">Asset diversification across platforms</p>
            </div>

            {/* SVG Donut Chart */}
            <div className="flex justify-center items-center py-6 relative">
              <svg width="180" height="180" className="transform -rotate-90">
                {categories.map((cat, i) => {
                  const percent = cat.value;
                  const strokeDash = (percent / 100) * circumference;
                  const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
                  accumulatedPercent += percent;

                  const isHovered = hoveredCategory && hoveredCategory.name === cat.name;

                  return (
                    <circle
                      key={i}
                      cx="90"
                      cy="90"
                      r={radius}
                      fill="transparent"
                      stroke={cat.color}
                      strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                      strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className="cursor-pointer transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Central Text Panel */}
              <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-mono">
                  {activeCategory.name}
                </span>
                <span className="text-2xl font-extrabold text-white font-mono mt-0.5">
                  {activeCategory.value}%
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5 font-bold">
                  {activeCategory.count} Assets Listed
                </span>
              </div>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {categories.map((cat, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-2 p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    hoveredCategory && hoveredCategory.name === cat.name
                      ? 'bg-gray-800/30 border-gray-700 text-white' 
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                  <span className="truncate">{cat.name}</span>
                  <span className="font-mono ml-auto font-bold text-[10px] text-gray-500">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Cryptographic Integrity Matrix */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <ShieldCheck className="text-bloomberg-orange" size={22} /> Smart Contract Security Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityMetrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-dark-lighter border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-300"
              >
                <div className={`p-2.5 rounded-lg w-fit ${metric.color} mb-4`}>
                  <metric.icon size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">{metric.title}</h4>
                <p className="text-lg font-extrabold font-mono text-white mt-2">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing RWA Assets Grid */}
        <div className="bg-dark-lighter border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-800 pb-5">
            <div>
              <h3 className="text-lg font-bold text-white">Asset Leaderboard</h3>
              <p className="text-xs text-gray-500 mt-0.5">Top performing tokenized commercial real estate assets</p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex bg-dark border border-gray-800 rounded-lg p-1 select-none">
              <button
                onClick={() => setActiveTab('yield')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all duration-200 ${
                  activeTab === 'yield' 
                    ? 'bg-bloomberg-orange text-black font-extrabold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sort by Annual Yield
              </button>
              <button
                onClick={() => setActiveTab('funding')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all duration-200 ${
                  activeTab === 'funding' 
                    ? 'bg-bloomberg-orange text-black font-extrabold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sort by Funding Progress
              </button>
            </div>
          </div>

          {/* Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <th className="pb-3 pl-2">Asset Details</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3 text-right">Property Value</th>
                  <th className="pb-3 text-right">Token Price</th>
                  <th className="pb-3 text-right">Yield Index</th>
                  <th className="pb-3 pl-6">Tokenization Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-sm font-semibold">
                {sortedProperties.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500 font-mono">
                      Retrieving assets from blockchain state...
                    </td>
                  </tr>
                ) : (
                  sortedProperties.slice(0, 6).map((property, index) => {
                    const totalTokens = property.total_value / property.token_price;
                    const tokensSold = totalTokens - property.available_tokens;
                    const fundingPercent = Math.min(100, Math.round((tokensSold / totalTokens) * 100));

                    return (
                      <tr 
                        key={property._id || index}
                        className="hover:bg-dark/40 transition-colors group"
                      >
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-extrabold text-gray-500 h-6 w-6 rounded border border-gray-800 flex items-center justify-center bg-dark">
                              #{index + 1}
                            </span>
                            <div>
                              <p className="text-white group-hover:text-bloomberg-orange transition-colors font-bold">
                                {property.title}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Globe size={11} /> {property.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-full border border-gray-700 bg-dark text-gray-400`}>
                            {property.property_type}
                          </span>
                        </td>
                        <td className="py-4 text-right font-mono text-white">
                          {formatCurrency(property.total_value)}
                        </td>
                        <td className="py-4 text-right font-mono text-gray-400">
                          {formatCurrency(property.token_price)}
                        </td>
                        <td className="py-4 text-right">
                          <span className="text-bloomberg-green font-mono text-sm font-bold flex items-center justify-end gap-0.5">
                            <ArrowUpRight size={13} /> {property.yield_percentage}%
                          </span>
                        </td>
                        <td className="py-4 pl-6">
                          <div className="max-w-[180px]">
                            <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-1 font-bold">
                              <span>{fundingPercent}% Fund</span>
                              <span className="text-[10px] text-gray-600">
                                {property.available_tokens.toLocaleString()} Left
                              </span>
                            </div>
                            <div className="w-full bg-dark h-2 rounded-full overflow-hidden border border-gray-800">
                              <div 
                                className="bg-gradient-to-r from-bloomberg-orange to-bloomberg-blue h-full rounded-full transition-all duration-500"
                                style={{ width: `${fundingPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
