import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Users, DollarSign, Settings, Activity, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simple auth check
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-dark-lighter hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-bloomberg-orange animate-pulse"></div>
            <span className="text-xs font-mono text-bloomberg-orange uppercase tracking-tighter">Owner Access</span>
          </div>
          <h2 className="text-xl font-bold text-white">Control Center</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 text-white rounded-lg border border-gray-700 transition-colors">
            <Activity size={18} className="text-bloomberg-orange" />
            <span className="font-medium text-sm">Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/30 hover:text-white rounded-lg transition-colors">
            <Home size={18} />
            <span className="font-medium text-sm">Properties</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/30 hover:text-white rounded-lg transition-colors">
            <Users size={18} />
            <span className="font-medium text-sm">Investors</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800/30 hover:text-white rounded-lg transition-colors">
            <FileText size={18} />
            <span className="font-medium text-sm">Transactions</span>
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">System Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Owner. Here is your platform's current status.</p>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-dark border border-gray-700 text-gray-300 rounded-lg text-sm hover:border-gray-500 transition-colors"
          >
            View Public Site
          </button>
        </header>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-lighter border border-gray-800 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Volume</p>
                <h3 className="text-2xl font-bold text-white mt-1">$45.2M</h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="text-green-500" size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-500">+12.5%</span>
              <span className="text-gray-600">from last month</span>
            </div>
          </div>
          
          <div className="bg-dark-lighter border border-gray-800 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Active Investors</p>
                <h3 className="text-2xl font-bold text-white mt-1">1,248</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="text-blue-500" size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-500">+48</span>
              <span className="text-gray-600">new this week</span>
            </div>
          </div>

          <div className="bg-dark-lighter border border-gray-800 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Platform Revenue</p>
                <h3 className="text-2xl font-bold text-white mt-1">$854.2K</h3>
              </div>
              <div className="p-2 bg-bloomberg-orange/10 rounded-lg">
                <Activity className="text-bloomberg-orange" size={20} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-green-500">+5.2%</span>
              <span className="text-gray-600">from last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-lighter border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-700 rounded-lg text-left hover:border-bloomberg-orange hover:bg-bloomberg-orange/5 transition-colors">
                <Home className="text-bloomberg-orange mb-2" size={20} />
                <h4 className="text-white font-medium text-sm">Add Property</h4>
                <p className="text-gray-500 text-xs mt-1">List a new RWA</p>
              </button>
              <button className="p-4 border border-gray-700 rounded-lg text-left hover:border-blue-500 hover:bg-blue-500/5 transition-colors">
                <Users className="text-blue-500 mb-2" size={20} />
                <h4 className="text-white font-medium text-sm">Manage Users</h4>
                <p className="text-gray-500 text-xs mt-1">Review verifications</p>
              </button>
              <button className="p-4 border border-gray-700 rounded-lg text-left hover:border-green-500 hover:bg-green-500/5 transition-colors">
                <FileText className="text-green-500 mb-2" size={20} />
                <h4 className="text-white font-medium text-sm">Generate Report</h4>
                <p className="text-gray-500 text-xs mt-1">Monthly yield summary</p>
              </button>
              <button className="p-4 border border-gray-700 rounded-lg text-left hover:border-purple-500 hover:bg-purple-500/5 transition-colors">
                <Settings className="text-purple-500 mb-2" size={20} />
                <h4 className="text-white font-medium text-sm">Platform Settings</h4>
                <p className="text-gray-500 text-xs mt-1">Configure global fees</p>
              </button>
            </div>
          </div>
          
          <div className="bg-dark-lighter border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0 last:pb-0">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs">0x{(Math.random() * 1000).toString(16).slice(0, 2)}</div>
                     <div>
                       <p className="text-sm text-white">New Investment Received</p>
                       <p className="text-xs text-gray-500">Tokyo Data Center • 2 mins ago</p>
                     </div>
                   </div>
                   <span className="text-sm font-medium text-green-500">+$25,000</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
