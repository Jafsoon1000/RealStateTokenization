import { Send, MessageSquare, X, GitBranch, Link2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-dark-lighter">
      {/* Newsletter CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Stay Ahead of the Market</h3>
            <p className="text-gray-500 text-sm">Get exclusive access to new listings, yield reports, and platform updates.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-dark border border-gray-800 text-gray-300 text-sm rounded-lg px-4 py-2.5 flex-1 md:w-64 focus:outline-none focus:border-bloomberg-orange/50 transition-colors placeholder:text-gray-600"
            />
            <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Send size={14} />
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Platform */}
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Governance</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Whitepaper</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Audit Reports</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Risk Disclosure</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4">Community</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"><X size={14} /> X (Twitter)</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"><MessageSquare size={14} /> Discord</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"><GitBranch size={14} /> GitHub</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2"><Link2 size={14} /> LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Jafsoon. All rights reserved. Not financial advice.
          </p>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-bloomberg-green animate-pulse"></div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
