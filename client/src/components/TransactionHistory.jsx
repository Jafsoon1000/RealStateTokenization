import { Clock, ExternalLink, ArrowUpRight, ArrowDownRight, Inbox } from 'lucide-react';

const mockTransactions = [
  {
    _id: '1',
    txHash: '0x7a3f...c921',
    property: { title: 'Skyline Office Tower', location: 'Berlin, Germany' },
    tokensBought: 50,
    totalCost: 50000,
    status: 'confirmed',
    createdAt: '2026-04-26T14:30:00Z',
  },
  {
    _id: '2',
    txHash: '0x9b2e...d412',
    property: { title: 'Waterfront Luxury Suites', location: 'Frankfurt, Germany' },
    tokensBought: 120,
    totalCost: 60000,
    status: 'confirmed',
    createdAt: '2026-04-25T10:15:00Z',
  },
  {
    _id: '3',
    txHash: '0x1c8d...f703',
    property: { title: 'Hamburg Logistics Terminal', location: 'Hamburg, Germany' },
    tokensBought: 10,
    totalCost: 20000,
    status: 'confirmed',
    createdAt: '2026-04-24T09:45:00Z',
  },
  {
    _id: '4',
    txHash: '0x4e5a...8b19',
    property: { title: 'Grand Munich Retail Plaza', location: 'Munich, Germany' },
    tokensBought: 200,
    totalCost: 50000,
    status: 'pending',
    createdAt: '2026-04-24T08:22:00Z',
  },
  {
    _id: '5',
    txHash: '0x6f2c...a205',
    property: { title: 'Stuttgart Tech Campus', location: 'Stuttgart, Germany' },
    tokensBought: 30,
    totalCost: 45000,
    status: 'confirmed',
    createdAt: '2026-04-23T16:10:00Z',
  },
];

const statusColor = {
  confirmed: 'text-bloomberg-green bg-bloomberg-green/10 border-bloomberg-green/20',
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  failed: 'text-red-500 bg-red-500/10 border-red-500/20',
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
};

const TransactionHistory = () => {
  return (
    <section className="py-12 border-t border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
          <p className="text-gray-500 text-sm mt-1">Latest platform activity across all verified assets</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-bloomberg-green animate-pulse"></div>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-tighter">Live Feed</span>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-[10px] text-gray-500 uppercase font-bold tracking-widest border-b border-gray-800">
        <div className="col-span-1">Status</div>
        <div className="col-span-3">Asset</div>
        <div className="col-span-2">Tx Hash</div>
        <div className="col-span-2 text-right">Tokens</div>
        <div className="col-span-2 text-right">Value</div>
        <div className="col-span-2 text-right">Time</div>
      </div>

      {/* Transaction Rows */}
      <div className="divide-y divide-gray-800/50">
        {mockTransactions.map((tx) => (
          <div
            key={tx._id}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-4 hover:bg-dark-lighter/50 transition-colors group"
          >
            {/* Status */}
            <div className="col-span-1 flex items-center">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${statusColor[tx.status]}`}>
                {tx.status}
              </span>
            </div>

            {/* Asset */}
            <div className="col-span-3">
              <p className="text-sm font-semibold text-white group-hover:text-bloomberg-orange transition-colors">
                {tx.property.title}
              </p>
              <p className="text-xs text-gray-500">{tx.property.location}</p>
            </div>

            {/* Tx Hash */}
            <div className="col-span-2 flex items-center gap-1">
              <span className="text-xs font-mono text-gray-400">{tx.txHash}</span>
              <ExternalLink size={10} className="text-gray-600 group-hover:text-bloomberg-orange transition-colors cursor-pointer" />
            </div>

            {/* Tokens */}
            <div className="col-span-2 flex items-center justify-end gap-1">
              <ArrowUpRight size={12} className="text-bloomberg-green" />
              <span className="text-sm font-mono text-white">{tx.tokensBought.toLocaleString()}</span>
            </div>

            {/* Value */}
            <div className="col-span-2 text-right">
              <span className="text-sm font-mono text-bloomberg-green">{formatCurrency(tx.totalCost)}</span>
            </div>

            {/* Time */}
            <div className="col-span-2 text-right flex items-center justify-end gap-1 text-gray-500">
              <Clock size={10} />
              <span className="text-xs font-mono">{formatDate(tx.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransactionHistory;
