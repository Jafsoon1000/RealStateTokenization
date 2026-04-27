import { Shield, Lock, FileCheck, Scale, Server, Eye } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Smart Contract Audited',
    description: 'All token contracts are audited by CertiK and OpenZeppelin with formal verification.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Lock,
    title: 'Escrow Protected',
    description: 'Investor funds are held in multi-sig escrow until the property closing is finalized on-chain.',
    color: 'text-bloomberg-orange',
    bg: 'bg-bloomberg-orange/10',
  },
  {
    icon: FileCheck,
    title: 'Legal Compliance',
    description: 'Every tokenized asset is structured under SPV entities with full SEC/MiFID II compliance.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Scale,
    title: 'KYC/AML Verified',
    description: 'All participants undergo institutional-grade identity verification through our compliance partners.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Server,
    title: 'Decentralized Custody',
    description: 'Asset ownership is recorded on Ethereum with IPFS-backed document storage for full transparency.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Eye,
    title: 'Real-Time Reporting',
    description: 'Track rental income, occupancy rates, and asset valuations through your investor dashboard.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
];

const SecurityFeatures = () => {
  return (
    <section className="py-20 border-t border-gray-800">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-accent border border-gray-800 text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">
          Security & Compliance
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Institutional-Grade <span className="text-bloomberg-orange">Security</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
          Every layer of the platform is built with the same security standards used by leading financial institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-dark-lighter border border-gray-800 rounded-xl p-6 group hover:border-gray-700 transition-all duration-300"
          >
            <div className={`w-11 h-11 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
              <feature.icon size={20} className={feature.color} />
            </div>
            <h3 className="text-white font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecurityFeatures;
