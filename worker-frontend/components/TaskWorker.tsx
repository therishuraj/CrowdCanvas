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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [canVote, setCanVote] = useState(false);

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

  // Timer effect - resets when task changes
  useEffect(() => {
    setTimeRemaining(5);
    setCanVote(false);

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setCanVote(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, currentTask?.id]);

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
    if (submitting || !canVote) return;

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
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">{currentTask.title}</h2>
            <p className="text-gray-300">
              Total Reward: <span className="font-semibold text-solana-blue">
                {(currentTask.amount / 1_000_000_000).toFixed(6)} SOL
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {availableTasks.length > 1 && (
              <div className="text-sm text-gray-400 bg-solana-darker px-4 py-2 rounded-lg">
                Task {currentIndex + 1} of {availableTasks.length}
              </div>
            )}
            {!canVote && (
              <div className="flex items-center gap-2 bg-yellow-900/30 border border-yellow-500/50 px-4 py-2 rounded-lg">
                <span className="text-2xl">⏱️</span>
                <div>
                  <div className="text-xs text-gray-400">Please wait</div>
                  <div className="text-xl font-bold text-yellow-400">{timeRemaining}s</div>
                </div>
              </div>
            )}
            {canVote && (
              <div className="flex items-center gap-2 bg-green-900/30 border border-green-500/50 px-4 py-2 rounded-lg">
                <span className="text-2xl">✅</span>
                <div className="text-sm font-semibold text-green-400">Ready to vote!</div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Structure Info */}
        <div className="bg-gradient-to-r from-green-900/20 to-yellow-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-sm font-semibold text-green-400 mb-3">💰 Payment Structure:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-solana-darker/50 p-3 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">⚡</span>
                <span className="text-xs text-gray-400">Instant Payment</span>
              </div>
              <div className="text-xl font-bold text-green-400">
                {((currentTask.amount / 1_000_000_000) / 2).toFixed(6)} SOL
              </div>
              <div className="text-xs text-gray-500 mt-1">Paid immediately when you vote</div>
            </div>
            <div className="bg-solana-darker/50 p-3 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏆</span>
                <span className="text-xs text-gray-400">Bonus (if you win)</span>
              </div>
              <div className="text-xl font-bold text-yellow-400">
                {((currentTask.amount / 1_000_000_000) / 2).toFixed(6)} SOL
              </div>
              <div className="text-xs text-gray-500 mt-1">Only if your choice is in majority</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-center text-gray-400 bg-solana-darker/30 p-2 rounded">
            ℹ️ You get 50% now + 50% bonus if your vote matches the majority
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {currentTask.options.map((option) => (
          <div key={option.id} className="relative group">
            <div className="relative w-full overflow-hidden rounded-lg border-2 border-solana-medium-blue">
              <img
                src={option.imageUrl}
                alt="Option"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => handleOptionClick(option.id)}
                disabled={submitting || !canVote}
                className={`absolute inset-0 bg-gradient-to-t from-solana-purple/80 to-transparent opacity-0 transition-all flex items-center justify-center ${
                  canVote && !submitting ? 'group-hover:opacity-100' : ''
                } ${!canVote || submitting ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-100'}`}
              >
                <span className="text-white font-bold text-xl">
                  {submitting ? 'Submitting...' : canVote ? 'Select' : ''}
                </span>
              </button>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(option.imageUrl);
              }}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-lg transition-all z-10"
              title="View full image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Full size preview"
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

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
