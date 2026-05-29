import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Home, Users, DollarSign, Settings, Activity, 
  FileText, Sun, Moon, Plus, Search, Edit2, Trash2, X, 
  MapPin, Percent, Layers, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import useStore from '../store/useStore';

// Curated modern real estate image choices for ease of adding assets
const CURATED_IMAGES = [
  { name: 'Berlin Office', url: '/images/berlin_office_tower.png' },
  { name: 'Frankfurt Suites', url: '/images/frankfurt_luxury_apartment.png' },
  { name: 'Munich Plaza', url: '/images/munich_retail_space_modern.png' },
  { name: 'Hamburg Terminal', url: '/images/hamburg_logistics_hub.png' },
  { name: 'Düsseldorf Harbor', url: '/images/dusseldorf_medienhafen.png' },
  { name: 'Tokyo Node', url: '/images/tokyo_data_center.png' },
  { name: 'Singapore Valley', url: '/images/singapore_tech_campus.png' },
  { name: 'London Retail', url: '/images/london_retail_plaza.png' },
  { name: 'NYC Penthouse', url: '/images/nyc_luxury_penthouse.png' },
  { name: 'Dubai Hub', url: '/images/dubai_mixed_use_tower.png' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { 
    theme, toggleTheme, properties, loading, 
    fetchProperties, addProperty, editProperty, deleteProperty 
  } = useStore();

  // Dashboard Tabs: 'overview' | 'properties'
  const [activeTab, setActiveTab] = useState('overview');

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);

  // Form State
  const defaultFormState = {
    title: '',
    location: '',
    image_url: CURATED_IMAGES[0].url,
    total_value: '',
    token_price: '1000',
    available_tokens: '',
    yield_percentage: '',
    property_type: 'commercial',
    description: '',
  };
  const [formData, setFormData] = useState(defaultFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Check Auth and Fetch Properties
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin');
    } else {
      fetchProperties();
    }
  }, [navigate, fetchProperties]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  // Helper to Format Currency
  const formatCurrency = (val) => {
    if (!val) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Form Field Change Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate available tokens when total_value or token_price changes
      if (name === 'total_value' || name === 'token_price') {
        const valueNum = parseFloat(updated.total_value) || 0;
        const priceNum = parseFloat(updated.token_price) || 1;
        updated.available_tokens = priceNum > 0 ? Math.floor(valueNum / priceNum).toString() : '0';
      }
      
      return updated;
    });
    
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageSelect = (url) => {
    setFormData((prev) => ({ ...prev, image_url: url }));
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.total_value || parseFloat(formData.total_value) <= 0) {
      errors.total_value = 'Must be a positive value';
    }
    if (!formData.token_price || parseFloat(formData.token_price) <= 0) {
      errors.token_price = 'Must be a positive price';
    }
    if (!formData.yield_percentage || parseFloat(formData.yield_percentage) < 0) {
      errors.yield_percentage = 'Yield must be a positive number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Add Form
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    const preparedData = {
      title: formData.title,
      location: formData.location,
      image_url: formData.image_url,
      total_value: parseFloat(formData.total_value),
      token_price: parseFloat(formData.token_price),
      available_tokens: parseInt(formData.available_tokens, 10),
      yield_percentage: parseFloat(formData.yield_percentage),
      property_type: formData.property_type,
      description: formData.description || `Institutional-grade ${formData.property_type} real estate asset located in ${formData.location}.`,
    };

    const res = await addProperty(preparedData);
    setIsSaving(false);
    if (res.success) {
      setIsAddModalOpen(false);
      setFormData(defaultFormState);
    } else {
      alert('Failed to list property asset. Please check network.');
    }
  };

  // Open Edit Modal
  const openEditModal = (property) => {
    setEditingPropertyId(property._id);
    setFormData({
      title: property.title,
      location: property.location,
      image_url: property.image_url,
      total_value: property.total_value.toString(),
      token_price: property.token_price.toString(),
      available_tokens: property.available_tokens.toString(),
      yield_percentage: property.yield_percentage.toString(),
      property_type: property.property_type,
      description: property.description || '',
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  // Save Edit Form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    const preparedData = {
      title: formData.title,
      location: formData.location,
      image_url: formData.image_url,
      total_value: parseFloat(formData.total_value),
      token_price: parseFloat(formData.token_price),
      available_tokens: parseInt(formData.available_tokens, 10),
      yield_percentage: parseFloat(formData.yield_percentage),
      property_type: formData.property_type,
      description: formData.description || `Institutional-grade ${formData.property_type} real estate asset located in ${formData.location}.`,
    };

    const res = await editProperty(editingPropertyId, preparedData);
    setIsSaving(false);
    if (res.success) {
      setIsEditModalOpen(false);
      setFormData(defaultFormState);
      setEditingPropertyId(null);
    } else {
      alert('Failed to update property asset.');
    }
  };

  // Delete Property
  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you absolutely sure you want to delete ${title} from the inventory? This cannot be undone.`)) {
      const res = await deleteProperty(id);
      if (!res.success) {
        alert('Failed to delete property asset.');
      }
    }
  };

  // Filter Properties based on Search and Dropdown
  const filteredProperties = properties.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || p.property_type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Calculate metrics for overview dashboard cards
  const totalVolume = properties.reduce((acc, p) => acc + p.total_value, 0);
  const averageYield = properties.length > 0 
    ? (properties.reduce((acc, p) => acc + p.yield_percentage, 0) / properties.length).toFixed(2)
    : '0.00';

  // Badges color mapping
  const getTypeBadgeStyles = (type) => {
    switch (type) {
      case 'commercial': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'residential': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'industrial': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'retail': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'mixed-use': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-dark flex text-gray-100 font-sans transition-colors duration-300">
      
      {/* Sidebar Control Center */}
      <aside className="w-64 border-r border-gray-800 bg-dark-lighter hidden md:flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-bloomberg-orange animate-pulse"></div>
            <span className="text-xs font-mono text-bloomberg-orange uppercase tracking-wider font-semibold">Owner Terminal</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Jafsoon Institutional</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg border transition-all text-left group ${
              activeTab === 'overview' 
                ? 'bg-gray-800/40 text-white border-gray-700 font-medium' 
                : 'text-gray-400 border-transparent hover:bg-gray-800/20 hover:text-white'
            }`}
          >
            <Activity size={18} className={`transition-colors ${activeTab === 'overview' ? 'text-bloomberg-orange' : 'text-gray-500 group-hover:text-gray-300'}`} />
            <span className="text-sm">Overview</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('properties')}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg border transition-all text-left group ${
              activeTab === 'properties' 
                ? 'bg-gray-800/40 text-white border-gray-700 font-medium' 
                : 'text-gray-400 border-transparent hover:bg-gray-800/20 hover:text-white'
            }`}
          >
            <Home size={18} className={`transition-colors ${activeTab === 'properties' ? 'text-bloomberg-orange' : 'text-gray-500 group-hover:text-gray-300'}`} />
            <span className="text-sm">Properties</span>
          </button>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-400 rounded-lg cursor-not-allowed text-left">
            <Users size={18} className="text-gray-600" />
            <span className="text-sm">Investors (🔒)</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-400 rounded-lg cursor-not-allowed text-left">
            <FileText size={18} className="text-gray-600" />
            <span className="text-sm">Transactions (🔒)</span>
          </a>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Upper Dashboard Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {activeTab === 'overview' ? 'System Overview' : 'Property Inventory'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {activeTab === 'overview' 
                ? 'Welcome back, Platform Owner. Real-time system performance indicators.' 
                : 'Browse, create, modify, and delete tokenized real estate assets in your platform.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-dark-lighter border border-gray-800 text-gray-400 hover:text-white transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-dark-lighter border border-gray-700 text-gray-100 font-semibold rounded-lg text-sm hover:border-gray-500 transition-colors"
            >
              View Public App
            </button>
          </div>
        </header>

        {/* --------------------- TAB 1: SYSTEM OVERVIEW --------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Total Value */}
              <div className="bg-dark-lighter border border-gray-800/80 p-6 rounded-xl relative overflow-hidden group hover:border-bloomberg-orange/40 transition-all duration-300">
                <div className="absolute right-0 top-0 h-24 w-24 bg-bloomberg-orange/5 rounded-full blur-2xl group-hover:bg-bloomberg-orange/10 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Inventory Value</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1.5">{formatCurrency(totalVolume)}</h3>
                  </div>
                  <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <DollarSign className="text-emerald-400" size={20} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="text-emerald-400 font-bold flex items-center">
                    <ArrowUpRight size={14} className="mr-0.5" /> +12.5%
                  </span>
                  <span>vs last month</span>
                </div>
              </div>
              
              {/* Average Yield */}
              <div className="bg-dark-lighter border border-gray-800/80 p-6 rounded-xl relative overflow-hidden group hover:border-bloomberg-orange/40 transition-all duration-300">
                <div className="absolute right-0 top-0 h-24 w-24 bg-bloomberg-orange/5 rounded-full blur-2xl group-hover:bg-bloomberg-orange/10 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Average Platform Yield</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1.5">{averageYield}% <span className="text-sm font-normal text-gray-500">p.a.</span></h3>
                  </div>
                  <div className="p-2.5 bg-bloomberg-orange/10 rounded-lg border border-bloomberg-orange/20">
                    <Percent className="text-bloomberg-orange" size={20} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="text-bloomberg-orange font-bold">Stable</span>
                  <span>across {properties.length} active assets</span>
                </div>
              </div>

              {/* Total Properties */}
              <div className="bg-dark-lighter border border-gray-800/80 p-6 rounded-xl relative overflow-hidden group hover:border-bloomberg-orange/40 transition-all duration-300">
                <div className="absolute right-0 top-0 h-24 w-24 bg-bloomberg-orange/5 rounded-full blur-2xl group-hover:bg-bloomberg-orange/10 transition-all"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Tokenized Assets</p>
                    <h3 className="text-3xl font-extrabold text-white mt-1.5">{properties.length}</h3>
                  </div>
                  <div className="p-2.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                    <Layers className="text-indigo-400" size={20} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="text-emerald-400 font-bold">Ready</span>
                  <span>in institutional database</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Static Recent Activity Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="bg-dark-lighter border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Control Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => { setActiveTab('properties'); setIsAddModalOpen(true); }}
                    className="p-5 border border-gray-800 rounded-xl text-left bg-dark/40 hover:border-bloomberg-orange hover:bg-bloomberg-orange/5 transition-all cursor-pointer group duration-200"
                  >
                    <Plus className="text-bloomberg-orange mb-3 transition-transform group-hover:scale-110" size={22} />
                    <h4 className="text-white font-semibold text-sm">List New Asset</h4>
                    <p className="text-gray-500 text-xs mt-1.5">Fractionalize commercial or residential property.</p>
                  </button>

                  <button 
                    onClick={() => setActiveTab('properties')}
                    className="p-5 border border-gray-800 rounded-xl text-left bg-dark/40 hover:border-sky-500 hover:bg-sky-500/5 transition-all cursor-pointer group duration-200"
                  >
                    <Layers className="text-sky-400 mb-3 transition-transform group-hover:scale-110" size={22} />
                    <h4 className="text-white font-semibold text-sm">Property Inventory</h4>
                    <p className="text-gray-500 text-xs mt-1.5">Modify values, prices, yield returns, or details.</p>
                  </button>

                  <button 
                    onClick={() => alert('KYC Manager and Investor directory is secured under institutional-grade contract policies.')}
                    className="p-5 border border-gray-800 rounded-xl text-left bg-dark/40 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all cursor-pointer group duration-200"
                  >
                    <ShieldCheck className="text-emerald-400 mb-3" size={22} />
                    <h4 className="text-white font-semibold text-sm">SEC / KYC Compliance</h4>
                    <p className="text-gray-500 text-xs mt-1.5">Check investor verification and AML standings.</p>
                  </button>

                  <button 
                    onClick={() => alert('Platform reports are generated dynamically at the end of the fiscal quarter.')}
                    className="p-5 border border-gray-800 rounded-xl text-left bg-dark/40 hover:border-purple-500 hover:bg-purple-500/5 transition-all cursor-pointer group duration-200"
                  >
                    <FileText className="text-purple-400 mb-3" size={22} />
                    <h4 className="text-white font-semibold text-sm">Generate Reports</h4>
                    <p className="text-gray-500 text-xs mt-1.5">Export platform TVL and rental payout files.</p>
                  </button>
                </div>
              </div>

              {/* Live activity feed */}
              <div className="bg-dark-lighter border border-gray-800 rounded-xl p-6 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4">Audited Event Ledger</h3>
                <div className="space-y-4 flex-1">
                  {[
                    { address: '0x71C...4d92', action: 'Invested', amount: '$35,000', detail: 'Skyline Office Tower', time: '5 mins ago' },
                    { address: '0x92b...a381', action: 'Invested', amount: '$12,000', detail: 'Tokyo Data Node', time: '14 mins ago' },
                    { address: '0x32A...881f', action: 'Whitelisted', amount: 'KYC Level 2', detail: 'Investor verified', time: '1 hour ago' },
                    { address: '0xf49...11c4', action: 'Invested', amount: '$85,000', detail: 'Hamburg Logistics Terminal', time: '2 hours ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-800/60 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-mono text-bloomberg-orange">
                          {item.action[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.address} • <span className="font-normal text-gray-400">{item.action}</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.detail} • {item.time}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-mono font-bold ${item.amount.startsWith('$') ? 'text-emerald-400' : 'text-sky-400'}`}>
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------- TAB 2: PROPERTIES INVENTORY --------------------- */}
        {activeTab === 'properties' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Toolbar: Search, Filters, Add Button */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-dark-lighter p-4 border border-gray-800 rounded-xl shadow-md">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3.5 top-3.5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Search by asset title, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-bloomberg-orange focus:ring-1 focus:ring-bloomberg-orange/20 transition-all"
                />
              </div>

              {/* Type Category Dropdown and Add Button */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="appearance-none bg-dark border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-bloomberg-orange pr-10 cursor-pointer min-w-[150px]"
                  >
                    <option value="all">All Types</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="industrial">Industrial</option>
                    <option value="retail">Retail</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <Layers size={14} />
                  </div>
                </div>

                <button
                  onClick={() => { setFormData(defaultFormState); setFormErrors({}); setIsAddModalOpen(true); }}
                  className="btn-primary flex items-center gap-2 text-sm py-2.5 px-4 cursor-pointer"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  List Property
                </button>
              </div>
            </div>

            {/* Properties Inventory Table */}
            <div className="bg-dark-lighter border border-gray-800 rounded-xl overflow-hidden shadow-lg">
              {loading ? (
                <div className="p-16 text-center text-gray-500 text-sm">
                  <div className="w-8 h-8 border-2 border-bloomberg-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  Querying blockchain and database records...
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="p-16 text-center text-gray-500 text-sm">
                  <Activity className="mx-auto mb-4 text-gray-600" size={32} />
                  No properties matched your search parameters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-900/30 text-xs font-mono text-gray-500 uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">Asset / Location</th>
                        <th className="py-4 px-4 font-semibold">Classification</th>
                        <th className="py-4 px-4 font-semibold">Valuation</th>
                        <th className="py-4 px-4 font-semibold">Yield</th>
                        <th className="py-4 px-4 font-semibold">Token Inventory</th>
                        <th className="py-4 px-6 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/70">
                      {filteredProperties.map((property) => (
                        <tr key={property._id} className="hover:bg-gray-800/10 transition-colors group">
                          
                          {/* Title & Info */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <img 
                                src={property.image_url} 
                                alt={property.title} 
                                className="w-14 h-10 object-cover rounded-lg border border-gray-800 shadow-sm"
                                onError={(e) => { e.target.src = '/images/berlin_office_tower.png'; }}
                              />
                              <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-bloomberg-orange transition-colors">{property.title}</h4>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <MapPin size={12} className="mr-1 shrink-0 text-gray-600" />
                                  <span>{property.location}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Classification Badge */}
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-full border ${getTypeBadgeStyles(property.property_type)}`}>
                              {property.property_type}
                            </span>
                          </td>

                          {/* Financials (Value & Price) */}
                          <td className="py-4 px-4">
                            <div>
                              <div className="text-sm font-bold font-mono text-white">
                                {formatCurrency(property.total_value)}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {formatCurrency(property.token_price)} / token
                              </div>
                            </div>
                          </td>

                          {/* Annual Yield */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1 text-sm font-mono font-bold text-bloomberg-orange">
                              <Percent size={14} />
                              <span>{property.yield_percentage.toFixed(2)}%</span>
                            </div>
                          </td>

                          {/* Token sale progress / volume */}
                          <td className="py-4 px-4">
                            <div className="w-44">
                              <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-1">
                                <span>{property.available_tokens.toLocaleString()} left</span>
                                <span>{Math.floor(property.total_value / property.token_price).toLocaleString()} total</span>
                              </div>
                              {/* Sleek Bloomberg loading bar */}
                              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-800">
                                <div 
                                  className="h-full bg-bloomberg-orange transition-all duration-500"
                                  style={{ 
                                    width: `${Math.max(0, Math.min(100, (property.available_tokens / (property.total_value / property.token_price)) * 100))}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>

                          {/* Action Items */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2.5">
                              <button 
                                onClick={() => openEditModal(property)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                                title="Edit Asset"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(property._id, property.title)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Delete Asset"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --------------------- MODAL: LIST NEW PROPERTY --------------------- */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-dark-lighter border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <div>
                  <h3 className="text-xl font-bold text-white">List Real Estate Asset</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Register fractional ownership shares on-chain.</p>
                </div>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form onSubmit={handleAddSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Visual Premium Image Selector */}
                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-2">Select Curator Image Assets</label>
                  <div className="grid grid-cols-5 gap-2 border border-gray-800 p-2 bg-dark/40 rounded-xl max-h-[140px] overflow-y-auto">
                    {CURATED_IMAGES.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => handleImageSelect(img.url)}
                        className={`relative rounded-lg overflow-hidden border-2 aspect-video transition-all ${
                          formData.image_url === img.url 
                            ? 'border-bloomberg-orange scale-95 ring-2 ring-bloomberg-orange/20' 
                            : 'border-transparent hover:border-gray-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-[8px] text-center font-mono font-semibold text-gray-300">
                          {img.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Asset Title *</label>
                    <input 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Frankfurt Luxury Suites"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.title && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.title}</p>}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Location *</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Frankfurt, Germany"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.location && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.location}</p>}
                  </div>

                  {/* Property Type classification */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Classification Type *</label>
                    <select 
                      name="property_type"
                      value={formData.property_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-bloomberg-orange"
                    >
                      <option value="commercial">Commercial</option>
                      <option value="residential">Residential</option>
                      <option value="industrial">Industrial</option>
                      <option value="retail">Retail</option>
                      <option value="mixed-use">Mixed-Use</option>
                    </select>
                  </div>

                  {/* Yield percentage */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Yield Percentage (p.a.) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      name="yield_percentage"
                      value={formData.yield_percentage}
                      onChange={handleInputChange}
                      placeholder="e.g. 7.5"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.yield_percentage && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.yield_percentage}</p>}
                  </div>

                  {/* Total Value */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Asset Valuation (USD) *</label>
                    <input 
                      type="number" 
                      name="total_value"
                      value={formData.total_value}
                      onChange={handleInputChange}
                      placeholder="e.g. 2500000"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.total_value && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.total_value}</p>}
                  </div>

                  {/* Token Price */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Individual Share Price (USD) *</label>
                    <input 
                      type="number" 
                      name="token_price"
                      value={formData.token_price}
                      onChange={handleInputChange}
                      placeholder="e.g. 1000"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.token_price && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.token_price}</p>}
                  </div>
                </div>

                {/* Calculated tokens / supply display */}
                <div className="bg-dark p-4 border border-gray-800 rounded-xl flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>Fractional Share Supply (Autocomputed):</span>
                  <span className="font-bold text-white text-sm">
                    {formData.available_tokens ? parseInt(formData.available_tokens, 10).toLocaleString() : 0} Shares
                  </span>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Asset Summary / Description</label>
                  <textarea 
                    rows="3" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide details about tenant profiles, lease lengths, and location parameters..."
                    className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange resize-none"
                  ></textarea>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-800">
                  <button 
                    type="button" 
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-gray-700 text-gray-300 font-medium rounded-lg text-sm hover:border-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="btn-primary flex items-center justify-center gap-2 text-sm px-6 py-2 cursor-pointer"
                  >
                    {isSaving ? 'Registering...' : 'Register Asset'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --------------------- MODAL: EDIT PROPERTY --------------------- */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-dark-lighter border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <div>
                  <h3 className="text-xl font-bold text-white">Modify Institutional Asset</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Revise valuation ledger parameters.</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Visual Premium Image Selector */}
                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-2">Select Curator Image Assets</label>
                  <div className="grid grid-cols-5 gap-2 border border-gray-800 p-2 bg-dark/40 rounded-xl max-h-[140px] overflow-y-auto">
                    {CURATED_IMAGES.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => handleImageSelect(img.url)}
                        className={`relative rounded-lg overflow-hidden border-2 aspect-video transition-all ${
                          formData.image_url === img.url 
                            ? 'border-bloomberg-orange scale-95 ring-2 ring-bloomberg-orange/20' 
                            : 'border-transparent hover:border-gray-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-[8px] text-center font-mono font-semibold text-gray-300">
                          {img.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Asset Title *</label>
                    <input 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Frankfurt Luxury Suites"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.title && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.title}</p>}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Location *</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Frankfurt, Germany"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.location && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.location}</p>}
                  </div>

                  {/* Property Type classification */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Classification Type *</label>
                    <select 
                      name="property_type"
                      value={formData.property_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-bloomberg-orange"
                    >
                      <option value="commercial">Commercial</option>
                      <option value="residential">Residential</option>
                      <option value="industrial">Industrial</option>
                      <option value="retail">Retail</option>
                      <option value="mixed-use">Mixed-Use</option>
                    </select>
                  </div>

                  {/* Yield percentage */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Yield Percentage (p.a.) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      name="yield_percentage"
                      value={formData.yield_percentage}
                      onChange={handleInputChange}
                      placeholder="e.g. 7.5"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.yield_percentage && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.yield_percentage}</p>}
                  </div>

                  {/* Total Value */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Asset Valuation (USD) *</label>
                    <input 
                      type="number" 
                      name="total_value"
                      value={formData.total_value}
                      onChange={handleInputChange}
                      placeholder="e.g. 2500000"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.total_value && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.total_value}</p>}
                  </div>

                  {/* Token Price */}
                  <div>
                    <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Individual Share Price (USD) *</label>
                    <input 
                      type="number" 
                      name="token_price"
                      value={formData.token_price}
                      onChange={handleInputChange}
                      placeholder="e.g. 1000"
                      className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange"
                    />
                    {formErrors.token_price && <p className="text-red-400 text-[11px] mt-1 font-mono">{formErrors.token_price}</p>}
                  </div>
                </div>

                {/* Calculated tokens / supply display */}
                <div className="bg-dark p-4 border border-gray-800 rounded-xl flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>Fractional Share Supply (Autocomputed):</span>
                  <span className="font-bold text-white text-sm">
                    {formData.available_tokens ? parseInt(formData.available_tokens, 10).toLocaleString() : 0} Shares
                  </span>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs uppercase font-mono text-gray-500 font-bold mb-1.5">Asset Summary / Description</label>
                  <textarea 
                    rows="3" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide details about lease parameters, vacancy, and capital structure..."
                    className="w-full px-3 py-2 bg-dark border border-gray-700 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-bloomberg-orange resize-none"
                  ></textarea>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-800">
                  <button 
                    type="button" 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-700 text-gray-300 font-medium rounded-lg text-sm hover:border-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="btn-primary flex items-center justify-center gap-2 text-sm px-6 py-2 cursor-pointer"
                  >
                    {isSaving ? 'Updating...' : 'Save Revisions'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
