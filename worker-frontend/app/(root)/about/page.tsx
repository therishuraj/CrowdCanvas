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
                  <span><strong>Expensive Design Testing:</strong> Traditional A/B testing for thumbnails, logos, or album covers costs ₹1L+ per campaign with agencies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Slow Turnaround:</strong> Market research takes 2-4 weeks. CrowdCanvas delivers results in 1-24 hours with real votes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>No Proof of Authenticity:</strong> Traditional surveys can be manipulated. Our blockchain votes are immutable and verifiable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Creative Uncertainty:</strong> Launching with the wrong design wastes ad spend. Get consensus before committing to production</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">For Workers</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>High Platform Fees:</strong> Platforms like Amazon MTurk, Clickworker take 20-40% cuts. We charge only minimal gas + storage fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Payment Delays:</strong> Wait 7-30 days for ₹500-₹2000 earnings. CrowdCanvas pays instantly in SOL (seconds, not weeks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Geographic Barriers:</strong> PayPal/Payoneer unavailable in many countries. Solana wallet works globally - just need internet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Account Suspensions:</strong> Centralized platforms can freeze accounts without reason. Your Solana wallet is yours forever</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong>Micro-Payment Impossible:</strong> Banks charge ₹20-₹50 per transaction. Solana costs ₹0.02, making ₹5-₹50 tasks viable</span>
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

        {/* Architecture Flow */}
        <section className="mb-16 bg-gradient-to-br from-solana-dark-blue to-solana-darker rounded-xl p-8 border border-solana-purple">
          <h2 className="text-3xl font-bold mb-8 text-center bg-solana-gradient bg-clip-text text-transparent">
            How CrowdCanvas Works
          </h2>
          
          <div className="space-y-8">
            {/* Worker Flow */}
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-solana-green/30">
              <h3 className="text-2xl font-semibold mb-6 text-solana-green flex items-center gap-2">
                <span>👷</span> Your Earning Journey
              </h3>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="bg-solana-green/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-green">
                    <span className="text-xl">1</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Connect Wallet</div>
                  <div className="text-xs text-gray-400">Sign in with Solana wallet (Phantom, Solflare, etc.)</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-green text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-green/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-green">
                    <span className="text-xl">2</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Review Task (5s)</div>
                  <div className="text-xs text-gray-400">Study images carefully before voting</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-green text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-green/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-green">
                    <span className="text-xl">3</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Vote & Earn</div>
                  <div className="text-xs text-gray-400">Select your favorite, earn 50% instantly</div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="text-center bg-solana-green/10 rounded-lg p-4 border border-solana-green/30">
                  <div className="text-sm font-semibold text-solana-green mb-2">🏆 Bonus Round!</div>
                  <div className="text-xs text-gray-400">If your vote matches the majority, earn an additional 50% bonus</div>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-gradient-to-r from-green-900/20 to-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
              <h3 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center gap-2">
                <span>💰</span> Payment Breakdown
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-solana-darker rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">⚡</span>
                    <div>
                      <div className="text-lg font-semibold text-white">Instant Payment (50%)</div>
                      <div className="text-xs text-gray-400">Paid immediately when you vote</div>
                    </div>
                  </div>
                  <div className="bg-solana-dark-blue/50 rounded p-3">
                    <div className="text-sm text-gray-300 mb-1">Example: Task pays 0.01 SOL</div>
                    <div className="text-2xl font-bold text-solana-green">0.005 SOL</div>
                    <div className="text-xs text-gray-400 mt-1">Credited to your balance instantly</div>
                  </div>
                </div>
                <div className="bg-solana-darker rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <div className="text-lg font-semibold text-white">Bonus (50%)</div>
                      <div className="text-xs text-gray-400">Only if you win majority vote</div>
                    </div>
                  </div>
                  <div className="bg-solana-dark-blue/50 rounded p-3">
                    <div className="text-sm text-gray-300 mb-1">If your choice wins</div>
                    <div className="text-2xl font-bold text-yellow-400">+0.005 SOL</div>
                    <div className="text-xs text-gray-400 mt-1">Total earned: 0.01 SOL (100%)</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-solana-darker/50 rounded-lg p-4 text-center border border-solana-purple/30">
                <div className="text-sm text-gray-300">
                  💡 <strong>Pro Tip:</strong> Choose wisely! Your earning potential doubles when you pick what the majority likes.
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-solana-darker/50 rounded-lg p-4 border border-solana-cyan/30 text-center">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-sm font-semibold text-white mb-2">Track Performance</div>
                <div className="text-xs text-gray-400">View insights: total earnings, win rate, task history</div>
              </div>
              <div className="bg-solana-darker/50 rounded-lg p-4 border border-solana-cyan/30 text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-sm font-semibold text-white mb-2">5-Second Timer</div>
                <div className="text-xs text-gray-400">Ensures you review tasks before voting</div>
              </div>
              <div className="bg-solana-darker/50 rounded-lg p-4 border border-solana-cyan/30 text-center">
                <div className="text-3xl mb-2">💸</div>
                <div className="text-sm font-semibold text-white mb-2">Instant Withdraw</div>
                <div className="text-xs text-gray-400">Request payout anytime, funds sent on-chain</div>
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
