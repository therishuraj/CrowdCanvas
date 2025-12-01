'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Link from 'next/link';
import { BACKEND_URL } from '@/lib/config';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Appbar() {
  const { publicKey, signMessage, disconnect } = useWallet();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);

  // Check if wallet disconnected or changed
  useEffect(() => {
    const token = localStorage.getItem('token');
    const walletAddress = publicKey?.toString() || null;
    
    // If no wallet connected, clear everything
    if (!publicKey) {
      if (isSignedIn) {
        localStorage.removeItem('token');
        setIsSignedIn(false);
        setCurrentWallet(null);
      }
      return;
    }

    // If wallet changed, clear old session
    if (currentWallet && walletAddress && currentWallet !== walletAddress) {
      localStorage.removeItem('token');
      setIsSignedIn(false);
      setCurrentWallet(walletAddress);
      // Auto sign in with new wallet
      if (signMessage) {
        handleSignin();
      }
      return;
    }

    // Initialize on mount
    if (!currentWallet && walletAddress) {
      setCurrentWallet(walletAddress);
    }

    // Check existing session
    if (token && walletAddress) {
      setIsSignedIn(true);
      fetchWalletBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  // Auto signin when wallet connects
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (publicKey && signMessage && !token) {
      handleSignin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, signMessage]);

  const fetchWalletBalance = async () => {
    if (!publicKey) return;
    try {
      const connection = new Connection('https://api.devnet.solana.com');
      const balance = await connection.getBalance(publicKey);
      setWalletBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Failed to fetch wallet balance:', error);
    }
  };

  const handleSignin = async () => {
    if (!publicKey || !signMessage) return;

    try {
      const message = new TextEncoder().encode('Sign into CrowdCanvas');
      const signature = await signMessage(message);

      const response = await axios.post(`${BACKEND_URL}/v1/user/signin`, {
        publicKey: publicKey.toString(),
        signature: { data: Array.from(signature) }
      });

      localStorage.setItem('token', response.data.token);
      setIsSignedIn(true);
      setCurrentWallet(publicKey.toString());
      fetchWalletBalance();
    } catch (error) {
      console.error('Signin failed:', error);
      localStorage.removeItem('token');
      setIsSignedIn(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    setCurrentWallet(null);
    setWalletBalance(0);
    disconnect();
  };

  return (
    <nav className="sticky top-0 z-50 bg-solana-darker border-b border-solana-medium-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/about">
              <h1 className="text-2xl font-bold bg-solana-gradient bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">CrowdCanvas</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {publicKey && (
              <div className="h-10 flex items-center text-sm bg-solana-dark-blue px-4 rounded-lg border border-solana-medium-blue">
                <span className="text-gray-400">Wallet: </span>
                <span className="font-bold text-solana-blue">{walletBalance.toFixed(4)} SOL</span>
              </div>
            )}
            <div className="h-10">
              <WalletMultiButtonDynamic />
            </div>
            {isSignedIn && (
              <button
                onClick={handleDisconnect}
                className="h-10 px-4 text-sm bg-solana-dark-blue text-white rounded-lg hover:bg-solana-medium-blue transition-colors"
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
