import { TrendingUp, Users, Activity, DollarSign } from 'lucide-react';

const stats = [
  {
    label: 'Total Volume Locked',
    value: '$1.2B+',
    change: '+12.4%',
    positive: true,
    icon: DollarSign,
  },
  {
    label: 'Active Investors',
    value: '14,200',
    change: '+8.7%',
    positive: true,
    icon: Users,
  },
  {
    label: 'Properties Tokenized',
    value: '42',
    change: '+3',
    positive: true,
    icon: Activity,
  },
  {
    label: 'Avg. Annual Return',
    value: '12.4%',
    change: '+0.6%',
    positive: true,
    icon: TrendingUp,
  },
];

const StatsBar = () => {
  return (
    <section className="py-8 border-t border-gray-800">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-dark-lighter border border-gray-800 rounded-xl p-5 flex items-start gap-4 group hover:border-gray-700 transition-all duration-300"
          >
            <div className="p-2.5 bg-bloomberg-orange/10 rounded-lg text-bloomberg-orange shrink-0">
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-white font-mono">{stat.value}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-0.5">{stat.label}</p>
              <p className={`text-xs font-mono mt-1.5 ${stat.positive ? 'text-bloomberg-green' : 'text-red-500'}`}>
                {stat.change} <span className="text-gray-600 text-[10px]">30d</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
