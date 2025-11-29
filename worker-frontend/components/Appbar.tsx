'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Appbar() {
  const { publicKey, signMessage, disconnect } = useWallet();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [balance, setBalance] = useState(0);

  // Listen for balance updates from TaskWorker
  useEffect(() => {
    const handleBalanceUpdate = (event: CustomEvent) => {
      setBalance(event.detail.balance);
    };
    window.addEventListener('balanceUpdated' as any, handleBalanceUpdate);
    return () => window.removeEventListener('balanceUpdated' as any, handleBalanceUpdate);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('workerToken');
    setIsSignedIn(!!token);
    if (token) {
      fetchBalance();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('workerToken');
    if (publicKey && signMessage && !token) {
      handleSignin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, signMessage]);

  const handleSignin = async () => {
    if (!publicKey || !signMessage) return;

    try {
      const message = new TextEncoder().encode('Sign into CrowdCanvas as a worker');
      const signature = await signMessage(message);

      const response = await axios.post(`${BACKEND_URL}/v1/worker/signin`, {
        publicKey: publicKey.toString(),
        signature: { data: Array.from(signature) }
      });

      localStorage.setItem('workerToken', response.data.token);
      setBalance(response.data.amount);
      setIsSignedIn(true);
    } catch (error) {
      console.error('Signin failed:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('workerToken');
      const response = await axios.get(`${BACKEND_URL}/v1/worker/balance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(response.data.pendingAmount);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const handlePayout = async () => {
    if (balance <= 0) {
      alert('No balance to withdraw');
      return;
    }
    
    if (!confirm('Request payout to your wallet?')) return;

    try {
      const token = localStorage.getItem('workerToken');
      const response = await axios.post(`${BACKEND_URL}/v1/worker/payout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(response.data.message);
      await fetchBalance();
    } catch (error) {
      console.error('Payout failed:', error);
      alert('Payout failed');
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('workerToken');
    setIsSignedIn(false);
    setBalance(0);
    disconnect();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">CrowdCanvas Worker</h1>
          </div>
          <div className="flex items-center gap-4">
            {isSignedIn && (
              <>
                <div className="text-sm">
                  <span className="text-gray-600">Balance: </span>
                  <span className="font-bold text-purple-600">{balance.toFixed(4)} SOL</span>
                </div>
                <button
                  onClick={handlePayout}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                >
                  Pay me out
                </button>
              </>
            )}
            <WalletMultiButtonDynamic />
            {isSignedIn && (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
