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

    try {
      setLoading(true);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
        toPubkey: new PublicKey('5SNxuX1yH4HC3STo7uh1hzdAYix54x5nCvhENfTBbLme'),
          lamports: 100000000, // 0.1 SOL
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
      <h2 className="text-3xl font-bold mb-8">Create a New Task</h2>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Select the most clickable thumbnail"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
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
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove Option
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addOption}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            + Add Option
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePayment}
            disabled={loading || !publicKey}
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Pay 0.1 SOL'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !signature}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>

        {signature && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              Payment completed! Transaction: {signature.slice(0, 20)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
