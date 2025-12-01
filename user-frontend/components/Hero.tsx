export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-solana-purple via-solana-dark-blue to-solana-darker text-white py-24 border-b border-solana-medium-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
            Decentralized Creative Consensus
          </h1>
          <p className="text-2xl md:text-3xl mb-10 text-gray-200 font-medium max-w-4xl mx-auto">
            Get authentic feedback. Pay with SOL. Results in hours.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-solana-dark-blue rounded-lg border border-solana-medium-blue hover:border-solana-blue transition-all">
              <div className="text-4xl font-bold mb-3">⚡</div>
              <div className="text-white font-semibold mb-1">Lightning Fast</div>
              <div className="text-gray-400 text-sm">Get results in hours, not weeks</div>
            </div>
            <div className="p-6 bg-solana-dark-blue rounded-lg border border-solana-medium-blue hover:border-solana-blue transition-all">
              <div className="text-4xl font-bold mb-3">💰</div>
              <div className="text-white font-semibold mb-1">Zero Fees</div>
              <div className="text-gray-400 text-sm">Workers earn 100% of your payment</div>
            </div>
            <div className="p-6 bg-solana-dark-blue rounded-lg border border-solana-medium-blue hover:border-solana-blue transition-all">
              <div className="text-4xl font-bold mb-3">🔒</div>
              <div className="text-white font-semibold mb-1">Transparent</div>
              <div className="text-gray-400 text-sm">All votes on Solana blockchain</div>
            </div>
            <div className="p-6 bg-solana-dark-blue rounded-lg border border-solana-medium-blue hover:border-solana-blue transition-all">
              <div className="text-4xl font-bold mb-3">🌍</div>
              <div className="text-white font-semibold mb-1">Global Reach</div>
              <div className="text-gray-400 text-sm">Access workers worldwide, instantly</div>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>$0.00025 per transaction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>100x cheaper than traditional research</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Instant SOL payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
