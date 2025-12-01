'use client';

import Appbar from '@/components/Appbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-solana-dark">
      <Appbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-solana-gradient bg-clip-text text-transparent">
            CrowdCanvas
          </h1>
          <p className="text-2xl text-gray-300 mb-4">Decentralized Creative Consensus Platform</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Transform creative decision-making by democratizing design choices through blockchain-powered micro-tasks.
          </p>
        </div>

        {/* The Problem */}
        <section className="mb-16 bg-solana-dark-blue rounded-xl p-8 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-6 text-solana-blue">The Problem We Solve</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">For Creators & Brands</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Expensive Market Research:</strong> Traditional A/B testing costs $5,000-$50,000 per campaign</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Biased Focus Groups:</strong> Small sample sizes (8-12 people) don't represent real audiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Slow Feedback Cycles:</strong> 2-4 weeks for traditional research vs. hours on CrowdCanvas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>No Transparent Validation:</strong> No proof that feedback is authentic or unbiased</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">For Workers</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Limited Micro-Task Platforms:</strong> Centralized platforms take 20-40% fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Payment Delays:</strong> 7-30 days to receive earnings on traditional platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Geographic Restrictions:</strong> Most platforms unavailable in developing countries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>No Ownership:</strong> Workers have zero stake in platforms they power</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Earn */}
        <section className="mb-16 bg-solana-dark-blue rounded-xl p-8 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-6 text-solana-blue">How to Earn on CrowdCanvas</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-solana-gradient text-solana-dark rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Connect Your Wallet</h3>
                <p className="text-gray-300">Use Phantom, Solflare, or any Solana wallet. No signup, no KYC - just connect and start.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-solana-gradient text-solana-dark rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Browse Available Tasks</h3>
                <p className="text-gray-300">See tasks from creators who need your opinion on designs, album covers, ads, and more.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-solana-gradient text-solana-dark rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Vote for Your Favorite</h3>
                <p className="text-gray-300">Choose the design you like best. Your honest opinion is valuable - that's what creators pay for!</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-solana-gradient text-solana-dark rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Earn Instant SOL</h3>
                <p className="text-gray-300">Get paid immediately to your wallet. Track your earnings and request payout anytime.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-solana-darker rounded-lg border border-solana-medium-blue">
            <h4 className="font-semibold text-white mb-3">Worker Benefits:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Zero platform fees - keep 100% of earnings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Instant payments (vs. 30-day waits elsewhere)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Work from anywhere in the world</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Transparent, verifiable earnings on-chain</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Blockchain */}
        <section className="mb-16 bg-solana-dark-blue rounded-xl p-8 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-6 text-solana-blue">Why Blockchain Matters</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Payments</h4>
                  <p className="text-sm">Get paid in seconds, not weeks. No middlemen holding your money.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Zero Fees</h4>
                  <p className="text-sm">No 20-40% platform fees. Workers earn 100% of what creators pay.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Global Access</h4>
                  <p className="text-sm">No geographic restrictions. Anyone with a wallet can participate.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Transparent</h4>
                  <p className="text-sm">All transactions verifiable on Solana explorer. No hidden deductions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-solana-purple via-solana-dark-blue to-solana-darker rounded-xl p-12 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Earning?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect your wallet and start voting on creative tasks. Earn SOL for your honest opinions.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-solana-gradient text-solana-dark rounded-lg hover:opacity-90 transition-all font-bold shadow-lg text-lg"
          >
            Start Earning Now
          </a>
        </section>
      </div>
    </div>
  );
}
