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
  const { publicKey, signMessage, disconnect, wallet } = useWallet();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsSignedIn(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (publicKey && signMessage && !token) {
      handleSignin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, signMessage]);

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
    } catch (error) {
      console.error('Signin failed:', error);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    disconnect();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">CrowdCanvas</h1>
          </div>
          <div className="flex items-center gap-4">
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
