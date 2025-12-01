'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BACKEND_URL } from '@/lib/config';
import { UploadImage } from './UploadImage';

interface TaskOption {
  imageUrl: string;
}

export default function CreateTask() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [totalSol, setTotalSol] = useState('0.1');
  const [votesRequired, setVotesRequired] = useState('10');
  const [options, setOptions] = useState<TaskOption[]>([{ imageUrl: '' }, { imageUrl: '' }]);
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(false);

  const addOption = () => {
    setOptions([...options, { imageUrl: '' }]);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].imageUrl = value;
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handlePayment = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    const solAmount = parseFloat(totalSol);
    if (isNaN(solAmount) || solAmount <= 0) {
      alert('Please enter a valid SOL amount');
      return;
    }

    const votes = parseInt(votesRequired);
    if (isNaN(votes) || votes <= 0) {
      alert('Please enter a valid number of votes');
      return;
    }

    try {
      setLoading(true);
      const lamports = Math.floor(solAmount * 1000000000);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
        toPubkey: new PublicKey('5SNxuX1yH4HC3STo7uh1hzdAYix54x5nCvhENfTBbLme'),
          lamports,
        })
      );

      const txSignature = await sendTransaction(transaction, connection);
      setSignature(txSignature);
      
      // Wait for transaction confirmation
      alert('Payment sent! Waiting for confirmation...');
      await connection.confirmTransaction(txSignature, 'confirmed');
      
      alert('Payment confirmed! Now submit your task.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setTotalSol('0.1');
    setVotesRequired('10');
    setOptions([{ imageUrl: '' }, { imageUrl: '' }]);
    setSignature('');
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!signature) {
      alert('Please complete payment first');
      return;
    }

    if (options.some(opt => !opt.imageUrl)) {
      alert('Please fill all image URLs');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BACKEND_URL}/v1/user/task`, {
        title: title || undefined,
        signature,
        totalSol: parseFloat(totalSol),
        votesRequired: parseInt(votesRequired),
        options
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Task created successfully!');
      
      // Ask if user wants to create another task
      const createAnother = confirm('Task created! Create another task?');
      
      if (createAnother) {
        resetForm();
      } else {
        router.push(`/task/${response.data.taskId}`);
      }
    } catch (error) {
      console.error('Task creation failed:', error);
      alert('Task creation failed');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 bg-solana-gradient bg-clip-text text-transparent">Create a New Task</h2>

      <div className="bg-solana-dark-blue rounded-xl shadow-2xl border border-solana-medium-blue p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Task Title (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Select the most clickable thumbnail"
            className="w-full px-4 py-2 bg-solana-darker border border-solana-medium-blue rounded-lg focus:ring-2 focus:ring-solana-purple focus:border-transparent text-white placeholder-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Total SOL Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={totalSol}
              onChange={(e) => setTotalSol(e.target.value)}
              placeholder="0.1"
              className="w-full px-4 py-2 bg-solana-darker border border-solana-medium-blue rounded-lg focus:ring-2 focus:ring-solana-purple focus:border-transparent text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Votes Required
            </label>
            <input
              type="number"
              step="1"
              min="1"
              value={votesRequired}
              onChange={(e) => setVotesRequired(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-2 bg-solana-darker border border-solana-medium-blue rounded-lg focus:ring-2 focus:ring-solana-purple focus:border-transparent text-white placeholder-gray-500"
            />
          </div>
        </div>

        {totalSol && votesRequired && parseFloat(totalSol) > 0 && parseInt(votesRequired) > 0 && (
          <div className="p-4 bg-solana-purple/10 border border-solana-purple/30 rounded-lg">
            <p className="text-sm text-solana-blue">
              💰 Payment per worker: <strong>{(parseFloat(totalSol) / parseInt(votesRequired)).toFixed(4)} SOL</strong>
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Options (Minimum 2)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <div key={index} className="space-y-2">
                <UploadImage
                  image={option.imageUrl}
                  onImageAdded={(imageUrl) => updateOption(index, imageUrl)}
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Remove Option
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addOption}
            className="mt-4 px-4 py-2 bg-solana-medium-blue text-white rounded-lg hover:bg-solana-light-blue transition-colors"
          >
            + Add Option
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePayment}
            disabled={loading || !publicKey}
            className="flex-1 px-6 py-3 bg-solana-purple text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Processing...' : `Pay ${totalSol} SOL`}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !signature}
            className="flex-1 px-6 py-3 bg-solana-blue text-solana-dark rounded-lg font-semibold hover:bg-opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>

        {signature && (
          <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-400">
              Payment completed! Transaction: {signature.slice(0, 20)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
