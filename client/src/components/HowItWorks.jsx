import { Wallet, ArrowRight, ShieldCheck, BarChart3, Globe } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Your Wallet',
    description: 'Link your MetaMask or WalletConnect-compatible wallet to access the institutional marketplace.',
    accent: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    icon: Globe,
    title: 'Browse Verified Assets',
    description: 'Explore curated, due-diligence verified commercial real estate assets across premium markets.',
    accent: 'bg-bloomberg-orange/10 text-bloomberg-orange border-bloomberg-orange/20',
  },
  {
    icon: BarChart3,
    title: 'Purchase Token Fractions',
    description: 'Buy fractional tokens representing ownership shares. Each token is backed 1:1 by the underlying asset.',
    accent: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Earn Passive Yield',
    description: 'Receive proportional rental income directly to your wallet. Track performance in your portfolio dashboard.',
    accent: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 border-t border-gray-800">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-accent border border-gray-800 text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">
          Process
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          How It <span className="text-bloomberg-orange">Works</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
          From wallet connection to passive income — tokenized real estate investing in four simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            <div className="bg-dark-lighter border border-gray-800 rounded-xl p-6 h-full transition-all duration-300 hover:border-bloomberg-orange/30 hover:shadow-lg hover:shadow-bloomberg-orange/5">
              {/* Step Number */}
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4">
                Step {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-4 ${step.accent}`}>
                <step.icon size={22} />
              </div>

              {/* Content */}
              <h3 className="text-white font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>

            {/* Connector Arrow (hidden on last item and mobile) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-700">
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
