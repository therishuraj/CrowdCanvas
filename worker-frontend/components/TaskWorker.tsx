'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';

interface TaskOption {
  id: string;
  imageUrl: string;
}

interface Task {
  id: string;
  title: string;
  amount: number;
  options: TaskOption[];
}

export default function TaskWorker() {
  const { publicKey } = useWallet();
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<string | null>(null);

  useEffect(() => {
    const walletAddress = publicKey?.toString() || null;
    
    if (publicKey) {
      // If wallet changed, reload tasks
      if (currentWallet && walletAddress && currentWallet !== walletAddress) {
        setCurrentWallet(walletAddress);
        setAvailableTasks([]);
        setCurrentIndex(0);
        fetchAvailableTasks();
      } else if (!currentWallet) {
        setCurrentWallet(walletAddress);
        fetchAvailableTasks();
      } else {
        fetchAvailableTasks();
      }
    } else {
      // Wallet disconnected
      setAvailableTasks([]);
      setCurrentWallet(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const fetchAvailableTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('workerToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/v1/worker/nextTask`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Check if tasks array exists and has items
      if (response.data.tasks && response.data.tasks.length > 0) {
        setAvailableTasks(response.data.tasks);
        setCurrentIndex(0);
      } else {
        setAvailableTasks([]);
      }
    } catch (error: any) {
      console.error('Failed to fetch tasks:', error);
      setAvailableTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const currentTask = availableTasks[currentIndex] || null;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < availableTasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleOptionClick = async (optionId: string) => {
    if (submitting) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('workerToken');
      const response = await axios.post(
        `${BACKEND_URL}/v1/worker/submission`,
        {
          taskId: currentTask!.id,
          selection: optionId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Remove completed task from available tasks
      const newTasks = availableTasks.filter((_, index) => index !== currentIndex);
      setAvailableTasks(newTasks);
      
      // Adjust current index if needed
      if (currentIndex >= newTasks.length && newTasks.length > 0) {
        setCurrentIndex(newTasks.length - 1);
      } else if (newTasks.length === 0) {
        setCurrentIndex(0);
      }

      // Update balance in Appbar
      const balanceEvent = new CustomEvent('balanceUpdated', {
        detail: { balance: response.data.amount }
      });
      window.dispatchEvent(balanceEvent);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-solana-dark-blue rounded-xl shadow-2xl border border-solana-medium-blue p-12 text-center">
        <p className="text-gray-400">Loading task...</p>
      </div>
    );
  }

  if (!publicKey) {
    return (
      <div className="bg-solana-dark-blue rounded-xl shadow-2xl border border-solana-medium-blue p-12 text-center">
        <p className="text-gray-300 text-lg">Please connect your wallet to start working</p>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="bg-solana-dark-blue rounded-xl shadow-2xl border border-solana-medium-blue p-12 text-center">
        <p className="text-gray-300 text-lg mb-4">No tasks available at the moment</p>
        <button
          onClick={fetchAvailableTasks}
          className="px-6 py-2 bg-solana-purple text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="bg-solana-dark-blue rounded-xl shadow-2xl border border-solana-medium-blue p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">{currentTask.title}</h2>
          <p className="text-gray-300">
            Reward: <span className="font-semibold text-solana-blue">
              {(currentTask.amount / 1_000_000_000).toFixed(6)} SOL
            </span>
          </p>
        </div>
        {availableTasks.length > 1 && (
          <div className="text-sm text-gray-400 bg-solana-darker px-4 py-2 rounded-lg">
            Task {currentIndex + 1} of {availableTasks.length}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {currentTask.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            disabled={submitting}
            className="relative group overflow-hidden rounded-lg border-2 border-solana-medium-blue hover:border-solana-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src={option.imageUrl}
              alt="Option"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-solana-purple/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {submitting ? 'Submitting...' : 'Select'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      {availableTasks.length > 1 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-solana-medium-blue text-white rounded-lg hover:bg-solana-light-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Previous Task
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === availableTasks.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-solana-medium-blue text-white rounded-lg hover:bg-solana-light-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Task
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
