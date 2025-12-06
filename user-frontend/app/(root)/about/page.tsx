'use client';

import Appbar from '@/components/Appbar';
import { DollarSign, Building2, Lock, Globe, Zap, Shield, BarChart3, User, Users, FileEdit, CheckCircle, Wallet, Database, ArrowDownToLine, Award, Smartphone, Lightbulb, Music, ShoppingBag, Megaphone, X } from 'lucide-react';

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
          <p className="text-2xl text-gray-300 mb-4">Solana-Powered Creative Consensus Platform</p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Transform creative decision-making by democratizing design choices through Solana blockchain-powered micro-tasks.
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
              <h3 className="text-xl font-semibold mb-4 text-white">For Contributors</h3>
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

        {/* Current Market Gap */}
        <section className="mb-16 bg-gradient-to-br from-red-900/20 to-solana-dark-blue rounded-xl p-8 border border-red-500/30">
          <h2 className="text-3xl font-bold mb-6 text-red-400">Current Market Gap</h2>
          <p className="text-gray-300 mb-6">Existing platforms fail due to payment infrastructure problems:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-start gap-3">
                <DollarSign className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">High Payment Fees</h3>
                  <p className="text-gray-300 text-sm">Banks charge ₹20-₹50 per transfer. PayPal takes 4.4% + fixed fees. Makes ₹5-₹50 micro-tasks economically impossible.</p>
                </div>
              </div>
            </div>
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-start gap-3">
                <Building2 className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Platform Intermediaries</h3>
                  <p className="text-gray-300 text-sm">Amazon MTurk extracts 40% fees, Clickworker takes 30%. Platforms hold and control all worker funds.</p>
                </div>
              </div>
            </div>
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-start gap-3">
                <Lock className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Payment Proof</h3>
                  <p className="text-gray-300 text-sm">Can&apos;t verify if tasks are actually funded or workers were paid. All records in private databases.</p>
                </div>
              </div>
            </div>
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Payment Delays</h3>
                  <p className="text-gray-300 text-sm">7-30 days for settlement. Platforms hold worker earnings in escrow indefinitely.</p>
                </div>
              </div>
            </div>
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-start gap-3">
                <Globe className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Cross-Border Barriers</h3>
                  <p className="text-gray-300 text-sm">International wire transfers take 3-5 days with $25-$50 fees. PayPal unavailable in 50+ countries. Currency conversion eats 3-5%.</p>
                </div>
              </div>
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
                <p className="text-white">Music artist uploads 4 album covers, pays 0.1 SOL for 10 votes, workers earn 0.005 SOL instant + 0.005 SOL bonus if they pick the winner. Results in hours with payment verified on Solana.</p>
              </div>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <h3 className="text-2xl font-semibold mb-4 text-solana-blue">For Contributors</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <span className="font-bold text-white">1. Connect Wallet</span> - Use Phantom or any Solana wallet
                </div>
                <div>
                  <span className="font-bold text-white">2. Review & Vote</span> - 5-second review timer ensures quality, then vote on your favorite
                </div>
                <div>
                  <span className="font-bold text-white">3. Earn SOL</span> - Get 50% instantly + 50% bonus if you win majority
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
                <Lock className="w-6 h-6 text-solana-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Secure Payment Verification</h4>
                  <p className="text-sm">Every payment is verified on-chain before task creation - no fake tasks or scams</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-solana-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Global Payments</h4>
                  <p className="text-sm">No bank delays or currency conversion fees - workers get paid in seconds</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-solana-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Wallet Authentication</h4>
                  <p className="text-sm">Sign in with your Solana wallet - no passwords, no email verification needed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-6 h-6 text-solana-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Transparent Payments</h4>
                  <p className="text-sm">All payments (task creation & worker payouts) are verifiable on Solana blockchain</p>
                </div>
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
            {/* User Flow */}
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-solana-cyan/30">
              <h3 className="text-2xl font-semibold mb-6 text-solana-cyan flex items-center gap-2">
                <User className="w-6 h-6" /> Task Creator Flow
              </h3>
              <div className="grid md:grid-cols-9 gap-3">
                <div className="text-center">
                  <div className="bg-solana-cyan/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-cyan">
                    <span className="text-xl">1</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Connect Wallet</div>
                  <div className="text-xs text-gray-400">Sign in with Solana</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-cyan text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-cyan/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-cyan">
                    <span className="text-xl">2</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Update Task Details</div>
                  <div className="text-xs text-gray-400">Upload images, set votes</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-cyan text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-cyan/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-cyan">
                    <span className="text-xl">3</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Pay in SOL</div>
                  <div className="text-xs text-gray-400">On-chain payment</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-cyan text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-cyan/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-cyan">
                    <span className="text-xl">4</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Create Task</div>
                  <div className="text-xs text-gray-400">Task goes live</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-cyan text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-cyan/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-cyan">
                    <span className="text-xl">5</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Get Response</div>
                  <div className="text-xs text-gray-400">Real-time insights</div>
                </div>
              </div>
            </div>

            {/* Contributor Flow */}
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-solana-green/30">
              <h3 className="text-2xl font-semibold mb-6 text-solana-green flex items-center gap-2">
                <Users className="w-6 h-6" /> Contributor Flow
              </h3>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="bg-solana-green/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-green">
                    <span className="text-xl">1</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Connect Wallet</div>
                  <div className="text-xs text-gray-400">Sign in with Solana wallet</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-green text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-green/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-green">
                    <span className="text-xl">2</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Wait for 60s</div>
                  <div className="text-xs text-gray-400">Review images carefully</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-solana-green text-2xl">→</div>
                </div>
                <div className="text-center">
                  <div className="bg-solana-green/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 border-2 border-solana-green">
                    <span className="text-xl">3</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">Vote & Earn</div>
                  <div className="text-xs text-gray-400">Get paid instantly in SOL</div>
                </div>
              </div>
            </div>

            {/* Backend Architecture Flow */}
            <div className="bg-solana-darker/50 rounded-lg p-6 border border-solana-purple/30">
              <h3 className="text-2xl font-semibold mb-6 text-solana-purple flex items-center gap-2">
                <span>⚙️</span> Backend Architecture Flow
              </h3>
              
              {/* Task Creation Flow */}
              <div className="mb-8">
                <div className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileEdit className="w-5 h-5 text-solana-cyan" /> Task Creation Flow
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-solana-purple/10 rounded-lg p-4 border border-solana-purple/50">
                    <div className="text-xs text-solana-purple mb-2 font-semibold">STEP 1</div>
                    <div className="text-sm font-bold text-white mb-3">User Payment</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Wallet signs transaction</div>
                      <div>• SOL sent to platform wallet</div>
                      <div>• Transaction signature returned</div>
                    </div>
                  </div>
                  
                  <div className="bg-solana-purple/10 rounded-lg p-4 border border-solana-purple/50">
                    <div className="text-xs text-solana-purple mb-2 font-semibold">STEP 2</div>
                    <div className="text-sm font-bold text-white mb-3">Verify On-Chain</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Solana RPC fetches transaction</div>
                      <div>• Validates recipient & amount</div>
                      <div>• Checks signature authenticity</div>
                    </div>
                  </div>
                  
                  <div className="bg-solana-purple/10 rounded-lg p-4 border border-solana-purple/50">
                    <div className="text-xs text-solana-purple mb-2 font-semibold">STEP 3</div>
                    <div className="text-sm font-bold text-white mb-3">Generate URLs</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• AWS S3 presigned URLs</div>
                      <div>• User uploads images</div>
                      <div>• Public URLs generated</div>
                    </div>
                  </div>
                  
                  <div className="bg-solana-purple/10 rounded-lg p-4 border border-solana-purple/50">
                    <div className="text-xs text-solana-purple mb-2 font-semibold">STEP 4</div>
                    <div className="text-sm font-bold text-white mb-3">Store in DB</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• MongoDB creates task</div>
                      <div>• Calculates amount per worker</div>
                      <div>• Task goes live for workers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Worker Voting Flow */}
              <div className="mb-8">
                <div className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-solana-green" /> Contributor Voting Flow
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-solana-green/10 rounded-lg p-4 border border-solana-green/50">
                    <div className="text-xs text-solana-green mb-2 font-semibold">STEP 1</div>
                    <div className="text-sm font-bold text-white mb-3">Fetch Tasks</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Query MongoDB for tasks</div>
                      <div>• Filter by worker&apos;s history</div>
                      <div>• Return available tasks</div>
                    </div>
                  </div>
                  
                  <div className="bg-solana-green/10 rounded-lg p-4 border border-solana-green/50">
                    <div className="text-xs text-solana-green mb-2 font-semibold">STEP 2</div>
                    <div className="text-sm font-bold text-white mb-3">Submit Vote</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Worker selects option</div>
                      <div>• Create submission record</div>
                      <div>• Calculate instant payment (50%)</div>
                    </div>
                  </div>
                  
                  <div className="bg-solana-green/10 rounded-lg p-4 border border-solana-green/50">
                    <div className="text-xs text-solana-green mb-2 font-semibold">STEP 3</div>
                    <div className="text-sm font-bold text-white mb-3">Update Balance</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Add 50% to pendingAmount</div>
                      <div>• Increment votesReceived</div>
                      <div>• Check if task complete</div>
                    </div>
                  </div>
                  
                  <div className="bg-solana-green/10 rounded-lg p-4 border border-solana-green/50">
                    <div className="text-xs text-solana-green mb-2 font-semibold">STEP 4</div>
                    <div className="text-sm font-bold text-white mb-3">Calculate Winner</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Count votes per option</div>
                      <div>• Find majority winner</div>
                      <div>• Pay 50% bonus to winners</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payout Flow */}
              <div>
                <div className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-yellow-400" /> Payout Flow
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/50">
                    <div className="text-xs text-yellow-400 mb-2 font-semibold">STEP 1</div>
                    <div className="text-sm font-bold text-white mb-3">Request Payout</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Worker requests withdrawal</div>
                      <div>• Check pendingAmount balance</div>
                      <div>• Validate wallet signature</div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/50">
                    <div className="text-xs text-yellow-400 mb-2 font-semibold">STEP 2</div>
                    <div className="text-sm font-bold text-white mb-3">Send SOL</div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Platform wallet signs tx</div>
                      <div>• SOL sent to worker wallet</div>
                      <div>• Record payout in MongoDB</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Summary */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-solana-darker/50 rounded-lg p-4 border border-solana-cyan/30 text-center">
                  <div className="text-2xl mb-2">⛓️</div>
                  <div className="text-sm font-semibold text-solana-cyan mb-1">Solana Devnet</div>
                  <div className="text-xs text-gray-400">Transaction verification & wallet signing</div>
                </div>
                <div className="bg-solana-darker/50 rounded-lg p-4 border border-solana-cyan/30 text-center">
                  <Database className="w-8 h-8 mx-auto mb-2 text-solana-cyan" />
                  <div className="text-sm font-semibold text-solana-cyan mb-1">MongoDB Atlas</div>
                  <div className="text-xs text-gray-400">Task storage & vote counting</div>
                </div>
                <div className="bg-solana-darker/50 rounded-lg p-4 border border-solana-cyan/30 text-center">
                  <div className="text-2xl mb-2">☁️</div>
                  <div className="text-sm font-semibold text-solana-cyan mb-1">AWS S3</div>
                  <div className="text-xs text-gray-400">Image hosting & CDN delivery</div>
                </div>
              </div>
            </div>

            {/* Payment Flow */}
            <div className="bg-gradient-to-r from-green-900/20 to-yellow-900/20 rounded-lg p-6 border border-yellow-500/30">
              <h3 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center gap-2">
                <DollarSign className="w-6 h-6" /> Payment Distribution
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <ArrowDownToLine className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
                  <div className="text-sm font-semibold text-white mb-2">User Payment</div>
                  <div className="text-xs text-gray-400 mb-3">Worker Payment + Platform Fee</div>
                  <div className="bg-solana-darker rounded p-3">
                    <div className="text-xs text-gray-400">Example:</div>
                    <div className="text-sm text-solana-cyan">0.1 SOL (workers) + 0.002526 SOL (fees)</div>
                  </div>
                </div>
                <div className="text-center">
                  <Zap className="w-10 h-10 mx-auto mb-3 text-green-400" />
                  <div className="text-sm font-semibold text-white mb-2">Instant (50%)</div>
                  <div className="text-xs text-gray-400 mb-3">Paid when worker votes</div>
                  <div className="bg-solana-darker rounded p-3">
                    <div className="text-xs text-gray-400">Per worker:</div>
                    <div className="text-sm text-solana-green">0.005 SOL immediately</div>
                  </div>
                </div>
                <div className="text-center">
                  <Award className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
                  <div className="text-sm font-semibold text-white mb-2">Bonus (50%)</div>
                  <div className="text-xs text-gray-400 mb-3">Paid if vote wins majority</div>
                  <div className="bg-solana-darker rounded p-3">
                    <div className="text-xs text-gray-400">Winners get:</div>
                    <div className="text-sm text-yellow-400">+0.005 SOL bonus</div>
                  </div>
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
              <Zap className="w-12 h-12 mx-auto mb-3 text-solana-cyan" />
              <h3 className="text-xl font-semibold mb-3 text-white">Lightning Fast</h3>
              <p className="text-gray-300 text-sm mb-2">400ms block time</p>
              <p className="text-gray-300 text-sm mb-2">65,000 TPS</p>
              <p className="text-gray-400 text-xs">Workers get paid in &lt;1 second</p>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-3 text-green-400" />
              <h3 className="text-xl font-semibold mb-3 text-white">Ultra Low Cost</h3>
              <p className="text-gray-300 text-sm mb-2">$0.00025 per transaction</p>
              <p className="text-gray-300 text-sm mb-2">vs $2-50 on Ethereum</p>
              <p className="text-gray-400 text-xs">Micro-payments are viable</p>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-3 text-purple-400" />
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

        {/* Why Blockchain - Detailed Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-solana-gradient bg-clip-text text-transparent">
            Why Blockchain? CrowdCanvas vs Traditional Platforms
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* With Blockchain (CrowdCanvas) */}
            <div className="bg-gradient-to-br from-green-900/30 to-solana-dark-blue rounded-xl p-6 border-2 border-green-500/50">
              <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> With Blockchain (CrowdCanvas)
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <strong className="text-white">Payment Verification:</strong> Every task creation verified on-chain. Cannot create fake tasks or steal user payments.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <strong className="text-white">Instant Settlement:</strong> Solana&apos;s 400ms blocks enable sub-second payouts. Workers earn in real-time, not weeks later.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <strong className="text-white">Secure Escrow System:</strong> Platform holds payments in parent wallet until task completion. Direct payouts to workers - no banks, no 7-day holds.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <strong className="text-white">Global Access:</strong> Anyone with a Solana wallet can participate. No bank account, PayPal, or credit card required.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <strong className="text-white">Transparent Costs:</strong> Gas fee (~₹0.02) + storage visible upfront. No hidden &quot;processing fees&quot; or currency conversion charges.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <strong className="text-white">Censorship Resistant:</strong> Can&apos;t freeze accounts or block users. Your wallet = your identity, forever.
                  </div>
                </div>
              </div>
            </div>

            {/* Without Blockchain (Traditional) */}
            <div className="bg-gradient-to-br from-red-900/30 to-solana-dark-blue rounded-xl p-6 border-2 border-red-500/50">
              <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center gap-2">
                <X className="w-5 h-5" /> Without Blockchain (Traditional Platforms)
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <strong className="text-white">Payment Trust Issues:</strong> MTurk, Clickworker can reject completed work. Workers lose both time and earnings with no recourse.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <strong className="text-white">Delayed Payouts:</strong> 7-30 day wait for ₹500-₹2000. Platform holds YOUR money to earn interest.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <strong className="text-white">High Platform Fees:</strong> 20-40% taken by platform. Amazon MTurk charges requesters 40% on top of worker payment!
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <strong className="text-white">Geographic Restrictions:</strong> PayPal unavailable in 50+ countries. Bank transfers fail across borders. Currency conversion eats 3-5%.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <strong className="text-white">Hidden Costs:</strong> &quot;Payment processing&quot; fees, withdrawal minimums (₹1000+), currency conversion, all chip away at earnings.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <div>
                    <strong className="text-white">Account Control:</strong> Platform can suspend/ban without warning. KYC takes days. Appeal process = black hole.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solana vs Ethereum - Detailed Comparison */}
        <section className="mb-16 bg-gradient-to-br from-solana-dark-blue to-solana-darker rounded-xl p-8 border border-solana-purple">
          <h2 className="text-3xl font-bold mb-8 text-center bg-solana-gradient bg-clip-text text-transparent">
            Why Solana Over Ethereum?
          </h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-solana-purple">
                  <th className="text-left py-4 px-4 text-white font-bold">Feature</th>
                  <th className="text-left py-4 px-4 text-solana-green font-bold">Solana ✓</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-bold">Ethereum</th>
                  <th className="text-left py-4 px-4 text-white font-bold">Impact on CrowdCanvas</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-solana-medium-blue">
                  <td className="py-4 px-4 text-gray-300 font-semibold">Transaction Speed</td>
                  <td className="py-4 px-4 text-solana-green">400ms block time</td>
                  <td className="py-4 px-4 text-gray-400">12 seconds</td>
                  <td className="py-4 px-4 text-gray-300">Workers get paid in &lt;1 second vs 12+ seconds wait</td>
                </tr>
                <tr className="border-b border-solana-medium-blue">
                  <td className="py-4 px-4 text-gray-300 font-semibold">Transaction Cost</td>
                  <td className="py-4 px-4 text-solana-green">₹0.02 (~$0.00025)</td>
                  <td className="py-4 px-4 text-gray-400">₹170-₹4200 ($2-$50)</td>
                  <td className="py-4 px-4 text-gray-300">Enables ₹5-₹50 micro-tasks. Ethereum fee &gt; task payment!</td>
                </tr>
                <tr className="border-b border-solana-medium-blue">
                  <td className="py-4 px-4 text-gray-300 font-semibold">Throughput (TPS)</td>
                  <td className="py-4 px-4 text-solana-green">65,000 TPS</td>
                  <td className="py-4 px-4 text-gray-400">15-30 TPS</td>
                  <td className="py-4 px-4 text-gray-300">Can handle 1000s of workers voting simultaneously</td>
                </tr>
                <tr className="border-b border-solana-medium-blue">
                  <td className="py-4 px-4 text-gray-300 font-semibold">Finality</td>
                  <td className="py-4 px-4 text-solana-green">Instant (1 block)</td>
                  <td className="py-4 px-4 text-gray-400">~15 minutes (64 blocks)</td>
                  <td className="py-4 px-4 text-gray-300">Payments confirmed immediately, no &quot;pending&quot; anxiety</td>
                </tr>
                <tr className="border-b border-solana-medium-blue">
                  <td className="py-4 px-4 text-gray-300 font-semibold">Gas Fee Model</td>
                  <td className="py-4 px-4 text-solana-green">Fixed, predictable</td>
                  <td className="py-4 px-4 text-gray-400">Variable, spikes 10-100x</td>
                  <td className="py-4 px-4 text-gray-300">Users know exact cost upfront, no surprise fees</td>
                </tr>
                <tr className="border-b border-solana-medium-blue">
                  <td className="py-4 px-4 text-gray-300 font-semibold">Mobile Wallet UX</td>
                  <td className="py-4 px-4 text-solana-green">Phantom, Solflare (seamless)</td>
                  <td className="py-4 px-4 text-gray-400">MetaMask (complex gas settings)</td>
                  <td className="py-4 px-4 text-gray-300">Workers don&apos;t need to understand &quot;gwei&quot; or gas limits</td>
                </tr>
                <tr className="border-b border-solana-medium-blue">
                  <td className="py-4 px-4 text-gray-300 font-semibold">Network Congestion</td>
                  <td className="py-4 px-4 text-solana-green">Rare, recovers fast</td>
                  <td className="py-4 px-4 text-gray-400">Frequent during NFT drops</td>
                  <td className="py-4 px-4 text-gray-300">Platform stays usable even during high activity</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-300 font-semibold">Example: 100 votes</td>
                  <td className="py-4 px-4 text-solana-green font-bold">₹2 total gas</td>
                  <td className="py-4 px-4 text-gray-400 font-bold">₹17,000+ total gas</td>
                  <td className="py-4 px-4 text-yellow-400 font-bold">8500x cheaper! Makes micro-tasks viable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-solana-darker/50 rounded-lg p-6 border border-yellow-500/30">
            <h4 className="text-lg font-semibold mb-3 text-yellow-400 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Real-World Impact</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <strong className="text-white">On Solana (Current):</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Task costs 0.1 SOL (₹850) for 10 votes</li>
                  <li>• Platform fee: ₹2 (gas + storage)</li>
                  <li>• Workers get ₹85 each instantly</li>
                  <li>• Total cost: ₹852 (99.7% goes to workers)</li>
                </ul>
              </div>
              <div>
                <strong className="text-white">On Ethereum (Impossible):</strong>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Same task would cost 0.1 ETH (₹28,000)</li>
                  <li>• Gas fees: ₹1,700 PER transaction</li>
                  <li>• 10 worker payouts = ₹17,000 in gas alone!</li>
                  <li>• Total cost: ₹45,000 (60% wasted on gas)</li>
                </ul>
              </div>
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
                  <h4 className="font-semibold text-white mb-1">Minimal Platform Fees</h4>
                  <p className="text-sm text-gray-300">Only gas (~₹0.02) + storage costs. Workers keep 99%+ vs. 60-80% on centralized platforms (MTurk charges 40%!)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Payments</h4>
                  <p className="text-sm text-gray-300">Sub-second payouts on Solana vs. 7-30 days on Amazon MTurk, Clickworker. No minimum withdrawal limits!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Permissionless Access</h4>
                  <p className="text-sm text-gray-300">No KYC, no approval delays, no account suspensions - just connect your wallet and start earning</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Transparent Payments</h4>
                  <p className="text-sm text-gray-300">Every payment verified on Solana blockchain - no hidden deductions, all transactions publicly auditable</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Global by Default</h4>
                  <p className="text-sm text-gray-300">Any wallet, any country, any currency - no PayPal restrictions, no banking barriers, works in 180+ countries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Fast Results</h4>
                  <p className="text-sm text-gray-300">Get consensus in 1-24 hours vs. 2-4 weeks traditional research - perfect for agile teams and tight deadlines</p>
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
              <Music className="w-12 h-12 mb-4 text-solana-cyan" />
              <h3 className="text-xl font-semibold mb-3 text-white">Musicians & Artists</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Album cover selection</li>
                <li>• Merch design testing</li>
                <li>• Promotional poster feedback</li>
                <li>• NFT art validation</li>
              </ul>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <ShoppingBag className="w-12 h-12 mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-3 text-white">Brands & Startups</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Product packaging design</li>
                <li>• Ad creative A/B testing</li>
                <li>• Logo selection</li>
                <li>• Landing page mockups</li>
              </ul>
            </div>

            <div className="bg-solana-dark-blue rounded-xl p-6 border border-solana-medium-blue">
              <Megaphone className="w-12 h-12 mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-3 text-white">Marketing & Events</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Festival/concert poster design</li>
                <li>• Event flyer variations</li>
                <li>• Campaign billboard mockups</li>
                <li>• Promotional banner selection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16 text-center bg-gradient-to-r from-solana-purple via-solana-dark-blue to-solana-darker rounded-xl p-12 border border-solana-medium-blue">
          <h2 className="text-3xl font-bold mb-6 text-white">Our Vision</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            To become the global standard for creative decision-making - where every creator, from indie artists to Fortune 500 brands, validates their ideas through authentic, Solana-powered consensus.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We&apos;re building the infrastructure for a future where creative feedback is instant, affordable, transparent, and fair for everyone involved.
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
