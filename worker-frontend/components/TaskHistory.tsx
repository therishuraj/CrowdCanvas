'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';

interface Submission {
  _id: string;
  taskId: {
    title: string;
    amount: number;
  };
  option: {
    imageUrl: string;
  };
  amount: number;
  createdAt: string;
}

interface Payout {
  _id: string;
  amount: number;
  signature: string;
  status: string;
  createdAt: string;
}

export default function TaskHistory() {
  const { publicKey } = useWallet();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'submissions' | 'payouts'>('submissions');

  useEffect(() => {
    if (publicKey) {
      fetchHistory();
    }
  }, [publicKey]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('workerToken');
      
      if (!token) {
        console.log('No worker token found. Please sign in first.');
        setLoading(false);
        return;
      }
      
      // Fetch submissions
      const submissionsResponse = await axios.get(`${BACKEND_URL}/v1/worker/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSubmissions(submissionsResponse.data.submissions || []);

      // Fetch payouts
      const payoutsResponse = await axios.get(`${BACKEND_URL}/v1/worker/payouts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPayouts(payoutsResponse.data.payouts || []);
    } catch (error: any) {
      // Only log actual errors, not empty responses
      if (error.response && error.response.status !== 404) {
        console.error('Error fetching history:', error);
      }
      setSubmissions([]);
      setPayouts([]);
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Work History</h2>
          <button
            onClick={fetchHistory}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'submissions'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed Tasks ({submissions.length})
            </button>
            <button
              onClick={() => setActiveTab('payouts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payouts'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payouts ({payouts.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : activeTab === 'submissions' ? (
          submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No completed tasks yet. Start working on tasks to earn!
            </div>
          ) : (
            <div className="grid gap-4">
              {submissions.map((submission) => (
                <div key={submission._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={submission.option.imageUrl}
                      alt="Task"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission.taskId.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Completed: {new Date(submission.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {(submission.amount / 1000000000).toFixed(4)} SOL
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          payouts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No payouts yet. Complete tasks and request payout to withdraw your earnings!
            </div>
          ) : (
            <div className="grid gap-4">
              {payouts.map((payout) => (
                <div key={payout._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {(payout.amount / 1000000000).toFixed(4)} SOL
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(payout.createdAt).toLocaleString()}
                      </p>
                      <a
                        href={`https://explorer.solana.com/tx/${payout.signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-600 hover:text-purple-800 mt-1 inline-block"
                      >
                        View on Explorer →
                      </a>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      payout.status === 'SUCCESS'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payout.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
