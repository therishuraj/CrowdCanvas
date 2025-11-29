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

  useEffect(() => {
    if (publicKey) {
      fetchAvailableTasks();
    } else {
      setAvailableTasks([]);
      setLoading(false);
    }
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
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-600">Loading task...</p>
      </div>
    );
  }

  if (!publicKey) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-600 text-lg">Please connect your wallet to start working</p>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-600 text-lg mb-4">No tasks available at the moment</p>
        <button
          onClick={fetchAvailableTasks}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">{currentTask.title}</h2>
          <p className="text-gray-600">
            Reward: <span className="font-semibold text-purple-600">
              {(currentTask.amount / 1_000_000_000).toFixed(6)} SOL
            </span>
          </p>
        </div>
        {availableTasks.length > 1 && (
          <div className="text-sm text-gray-600">
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
            className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src={option.imageUrl}
              alt="Option"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
              <span className="text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-all">
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
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Previous Task
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === availableTasks.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
