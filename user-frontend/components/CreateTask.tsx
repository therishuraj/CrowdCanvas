'use client';

import { useState, useEffect } from 'react';
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
  const [imageSizes, setImageSizes] = useState<Record<number, number>>({});
  const [gasFee, setGasFee] = useState<number>(0.000005); // Default gas fee

  // Platform fee constants
  const STORAGE_COST_PER_MB = 0.0001; // SOL per MB

  // Fetch current gas fee from network based on actual transaction
  useEffect(() => {
    const fetchGasFee = async () => {
      if (!publicKey) return;
      
      try {
        // Calculate the amount that will be sent (worker payment + platform fee)
        const votes = parseInt(votesRequired) || 0;
        const workerPayment = parseFloat(totalSol) || 0;
        const totalImageSizeMB = Object.values(imageSizes).reduce((sum, size) => sum + size, 0);
        const storageCost = totalImageSizeMB * STORAGE_COST_PER_MB;
        const platformFeeAmount = votes > 0 ? storageCost * votes : 0;
        const totalPayment = workerPayment + platformFeeAmount;
        
        // Create a test transaction to estimate fee
        const testTransaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey('5SNxuX1yH4HC3STo7uh1hzdAYix54x5nCvhENfTBbLme'),
            lamports: Math.floor(totalPayment * 1000000000),
          })
        );
        
        const { blockhash } = await connection.getLatestBlockhash();
        testTransaction.recentBlockhash = blockhash;
        testTransaction.feePayer = publicKey;
        
        const message = testTransaction.compileMessage();
        const feeCalculator = await connection.getFeeForMessage(message, 'confirmed');
        
        if (feeCalculator.value) {
          // Convert lamports to SOL
          setGasFee(feeCalculator.value / 1000000000);
        }
      } catch (error) {
        console.error('Failed to fetch gas fee:', error);
        // Keep default value
      }
    };

    if (connection && publicKey) {
      fetchGasFee();
      // Refresh gas fee when amount or votes change
    }
  }, [connection, publicKey, totalSol, votesRequired, imageSizes]);

  // Calculate total image size
  const totalImageSizeMB = Object.values(imageSizes).reduce((sum, size) => sum + size, 0);
  
  // Calculate storage cost
  const storageCost = totalImageSizeMB * STORAGE_COST_PER_MB;
  
  // Calculate platform fee (storage cost * votes since images are served per vote)
  const votes = parseInt(votesRequired) || 0;
  const platformFee = votes > 0 ? storageCost * votes : 0;
  
  // Total cost = worker payments + platform fee + gas fee
  const workerPayment = parseFloat(totalSol) || 0;
  const totalCost = workerPayment + platformFee + gasFee;

  const addOption = () => {
    setOptions([...options, { imageUrl: '' }]);
  };

  const updateOption = (index: number, value: string, size?: number) => {
    const newOptions = [...options];
    newOptions[index].imageUrl = value;
    setOptions(newOptions);
    
    // Update image size if provided
    if (size !== undefined) {
      setImageSizes(prev => ({ ...prev, [index]: size }));
    }
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
      // Total payment includes worker payment + platform fee
      const totalPayment = workerPayment + platformFee;
      const lamports = Math.floor(totalPayment * 1000000000);
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
        options,
        platformFee: platformFee,
        gasFee: gasFee,
        totalAmount: totalCost
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
          <div className="space-y-3">
            {/* Cost Breakdown */}
            <div className="p-4 bg-gradient-to-r from-solana-purple/10 to-solana-blue/10 border border-solana-purple/30 rounded-lg space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">💰 Payment per worker:</span>
                <span className="font-semibold text-solana-blue">{(workerPayment / votes).toFixed(6)} SOL</span>
              </div>
              
              {/* Payment Structure Breakdown */}
              <div className="ml-4 space-y-1 bg-solana-darker/50 p-3 rounded-lg border border-solana-medium-blue/30">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">⚡ Instant (on vote):</span>
                  <span className="text-green-400 font-semibold">{((workerPayment / votes) / 2).toFixed(6)} SOL (50%)</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">🏆 Bonus (if majority wins):</span>
                  <span className="text-yellow-400 font-semibold">{((workerPayment / votes) / 2).toFixed(6)} SOL (50%)</span>
                </div>
                <div className="text-xs text-gray-500 mt-2 italic">
                  * Workers receive 50% instantly when voting, 50% bonus only if their choice wins
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">👥 Total workers:</span>
                <span className="font-semibold text-white">{votes}</span>
              </div>
              <div className="h-px bg-solana-medium-blue/50"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">📊 Subtotal (Workers):</span>
                <span className="font-semibold text-white">{workerPayment.toFixed(6)} SOL</span>
              </div>
            </div>

            {/* Platform Fee Breakdown */}
            <div className="p-4 bg-yellow-900/10 border border-yellow-500/30 rounded-lg space-y-2">
              <div className="text-sm font-semibold text-yellow-400 mb-2">⚡ Platform Fees</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">📦 Storage ({totalImageSizeMB.toFixed(2)} MB × {votes} views):</span>
                <span className="text-gray-300">{(storageCost * votes).toFixed(6)} SOL</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">⛽ Wallet transaction (gas) fee:</span>
                <span className="text-gray-300">{gasFee.toFixed(6)} SOL</span>
              </div>
              <div className="h-px bg-yellow-500/20"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-yellow-400 font-semibold">Total Platform Fee:</span>
                <span className="text-yellow-400 font-semibold">{(platformFee + gasFee).toFixed(6)} SOL</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="p-4 bg-green-900/20 border-2 border-green-500/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-400">💳 Total Cost:</span>
                <span className="text-2xl font-bold text-green-400">{totalCost.toFixed(6)} SOL</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                * Storage fee covers cloud hosting and bandwidth for {votes} worker views
              </p>
            </div>
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
                  onImageAdded={(imageUrl, size) => updateOption(index, imageUrl, size)}
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
            {loading ? 'Processing...' : `Pay ${totalCost.toFixed(6)} SOL`}
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
