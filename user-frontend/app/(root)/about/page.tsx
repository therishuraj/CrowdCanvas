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

        {/* Our Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-solana-gradient bg-clip-text text-transparent">
            Our Solution
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <h3 className="text-2xl font-semibold mb-4 text-solana-blue">For Creators</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <span className="font-bold text-white">1. Upload Options</span> - Album covers, ad designs, product packaging, etc.
                </div>
                <div>
                  <span className="font-bold text-white">2. Set Budget & Votes</span> - Custom SOL amount and number of votes needed
                </div>
                <div>
                  <span className="font-bold text-white">3. Pay SOL</span> - Instant on-chain payment verification
                </div>
                <div>
                  <span className="font-bold text-white">4. Get Results</span> - Real-time results as workers vote (1-24 hours)
                </div>
              </div>
              <div className="mt-6 p-4 bg-solana-darker rounded-lg border border-solana-medium-blue">
                <p className="text-sm text-gray-400">Example:</p>
                <p className="text-white">Music artist uploads 4 album covers, sets 0.5 SOL for 100 votes (0.005 SOL per vote), gets consensus in hours with all votes immutably recorded on Solana.</p>
              </div>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <h3 className="text-2xl font-semibold mb-4 text-solana-blue">For Workers</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <span className="font-bold text-white">1. Connect Wallet</span> - Use Phantom or any Solana wallet
                </div>
                <div>
                  <span className="font-bold text-white">2. Vote on Tasks</span> - Choose your favorite design from options
                </div>
                <div>
                  <span className="font-bold text-white">3. Earn SOL</span> - Instant payment to your wallet
                </div>
                <div>
                  <span className="font-bold text-white">4. Request Payout</span> - Withdraw earnings anytime, on-chain
                </div>
              </div>
              <div className="mt-6 p-4 bg-solana-darker rounded-lg border border-solana-medium-blue">
                <p className="text-sm text-gray-400">Benefits:</p>
                <ul className="text-white space-y-1">
                  <li>✓ No signup friction (just connect wallet)</li>
                  <li>✓ Instant SOL earnings (vs. 30-day waits)</li>
                  <li>✓ Global access (no restrictions)</li>
                  <li>✓ Transparent earnings (verifiable on-chain)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Blockchain */}
        <section className="mb-16 bg-solana-dark-blue rounded-xl p-8 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-6 text-solana-blue">Why Blockchain?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Immutable Vote Record</h4>
                  <p className="text-sm">Can't manipulate or delete votes - every vote is permanently recorded on Solana</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Global Payments</h4>
                  <p className="text-sm">No bank delays or currency conversion fees - workers get paid in seconds</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Sybil Resistance</h4>
                  <p className="text-sm">Wallet-based identity prevents fake votes and duplicate submissions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Transparent Audit Trail</h4>
                  <p className="text-sm">Every transaction is public and verifiable on the Solana blockchain</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Solana */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-solana-gradient bg-clip-text text-transparent">
            Why Solana?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Lightning Fast</h3>
              <p className="text-gray-300 text-sm mb-2">400ms block time</p>
              <p className="text-gray-300 text-sm mb-2">65,000 TPS</p>
              <p className="text-gray-400 text-xs">Workers get paid in &lt;1 second</p>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Ultra Low Cost</h3>
              <p className="text-gray-300 text-sm mb-2">$0.00025 per transaction</p>
              <p className="text-gray-300 text-sm mb-2">vs $2-50 on Ethereum</p>
              <p className="text-gray-400 text-xs">Micro-payments are viable</p>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Best UX</h3>
              <p className="text-gray-300 text-sm mb-2">75+ million wallets</p>
              <p className="text-gray-300 text-sm mb-2">Mobile-first (Phantom, Solflare)</p>
              <p className="text-gray-400 text-xs">Instant finality, no gas complexity</p>
            </div>
          </div>

          <div className="bg-solana-darker rounded-xl p-6 border border-solana-medium-blue">
            <h3 className="text-lg font-semibold mb-4 text-white">Comparison with Other Chains</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-solana-medium-blue">
                    <th className="text-left py-3 px-4 text-gray-300">Chain</th>
                    <th className="text-left py-3 px-4 text-gray-300">Block Time</th>
                    <th className="text-left py-3 px-4 text-gray-300">Transaction Fee</th>
                    <th className="text-left py-3 px-4 text-gray-300">Why Not?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-solana-medium-blue">
                    <td className="py-3 px-4 font-bold text-solana-blue">Solana ✓</td>
                    <td className="py-3 px-4 text-white">400ms</td>
                    <td className="py-3 px-4 text-white">$0.00025</td>
                    <td className="py-3 px-4 text-green-400">Perfect fit! ✓</td>
                  </tr>
                  <tr className="border-b border-solana-medium-blue">
                    <td className="py-3 px-4 text-gray-300">Ethereum</td>
                    <td className="py-3 px-4 text-gray-400">12s</td>
                    <td className="py-3 px-4 text-gray-400">$2-50</td>
                    <td className="py-3 px-4 text-red-400">Too expensive for micro-payments</td>
                  </tr>
                  <tr className="border-b border-solana-medium-blue">
                    <td className="py-3 px-4 text-gray-300">BSC</td>
                    <td className="py-3 px-4 text-gray-400">3s</td>
                    <td className="py-3 px-4 text-gray-400">$0.10-1</td>
                    <td className="py-3 px-4 text-red-400">Centralized, higher fees</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Polygon</td>
                    <td className="py-3 px-4 text-gray-400">2s</td>
                    <td className="py-3 px-4 text-gray-400">$0.01</td>
                    <td className="py-3 px-4 text-red-400">Slower finality, less adoption</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Competitive Advantage */}
        <section className="mb-16 bg-solana-dark-blue rounded-xl p-8 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-6 text-solana-blue">What Makes Us Unique</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Zero Platform Fees</h4>
                  <p className="text-sm text-gray-300">Workers keep 100% of earnings vs. 60-80% on centralized platforms</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Payments</h4>
                  <p className="text-sm text-gray-300">Sub-second payouts vs. 7-30 days on Amazon MTurk, Clickworker</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Permissionless Access</h4>
                  <p className="text-sm text-gray-300">No KYC, no approval process - just connect your wallet and start</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Transparent & Auditable</h4>
                  <p className="text-sm text-gray-300">All votes recorded on-chain, publicly verifiable on Solana explorer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Global by Default</h4>
                  <p className="text-sm text-gray-300">Any wallet, any country - no geographic restrictions or currency barriers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Fast Results</h4>
                  <p className="text-sm text-gray-300">Get feedback in hours, not weeks - perfect for agile creators</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-solana-gradient bg-clip-text text-transparent">
            Perfect For
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Musicians & Artists</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Album cover selection</li>
                <li>• Merch design testing</li>
                <li>• Promotional poster feedback</li>
                <li>• NFT art validation</li>
              </ul>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Brands & Startups</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Product packaging design</li>
                <li>• Ad creative A/B testing</li>
                <li>• Logo selection</li>
                <li>• Landing page mockups</li>
              </ul>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Content Creators</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• YouTube thumbnail testing</li>
                <li>• Social media banner selection</li>
                <li>• Course cover design</li>
                <li>• Book cover feedback</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16 text-center bg-gradient-to-r from-solana-purple via-solana-dark-blue to-solana-darker rounded-xl p-12 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Vision</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            To become the global standard for creative decision-making - where every creator, from indie artists to Fortune 500 brands, validates their ideas through authentic, decentralized consensus.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We're building the infrastructure for a future where creative feedback is instant, affordable, transparent, and fair for everyone involved.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">Connect your wallet and start creating tasks or earning SOL today.</p>
          <div className="flex justify-center gap-4">
            <a
              href="/"
              className="px-8 py-3 bg-solana-gradient text-solana-dark rounded-lg hover:opacity-90 transition-all font-bold shadow-lg"
            >
              Get Started
            </a>
            <a
              href="https://github.com/therishuraj/CrowdCanvas"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-solana-dark-blue text-white rounded-lg hover:bg-solana-medium-blue transition-colors font-bold border border-solana-medium-blue"
            >
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
