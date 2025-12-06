'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { useRouter } from 'next/navigation';
import { BarChart3, TrendingUp } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  amount: number;
  done: boolean;
  createdAt: string;
}

export default function TaskList() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (publicKey) {
      fetchTasks();
    }
  }, [publicKey]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/v1/user/task`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewTask = (taskId: string) => {
    router.push(`/task/${taskId}`);
  };

  if (!publicKey) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-solana-dark-blue rounded-xl shadow-2xl border border-solana-medium-blue p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-solana-gradient bg-clip-text text-transparent">My Tasks</h2>
          <button
            onClick={fetchTasks}
            className="px-4 py-2 bg-solana-purple text-white rounded-lg hover:bg-opacity-90 transition-all"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No tasks created yet. Create your first task above!
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border border-solana-medium-blue bg-solana-darker rounded-lg p-4 hover:border-solana-purple transition-all cursor-pointer"
                onClick={() => viewTask(task._id)}
                onClick={(e) => {
                  e.stopPropagation();
                  viewTask(task._id);
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/task/${task._id}`);
                        }}
                        className="px-3 py-1 text-xs bg-solana-cyan/20 text-solana-cyan rounded-lg hover:bg-solana-cyan/30 transition-colors"
                      >
                        <BarChart3 className="w-4 h-4 inline mr-1" /> View Results
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/task/${task._id}/insights`);
                        }}
                        className="px-3 py-1 text-xs bg-solana-purple/20 text-solana-purple rounded-lg hover:bg-solana-purple/30 transition-colors"
                      >
                        <TrendingUp className="w-4 h-4 inline mr-1" /> View Insights
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-solana-blue">
                      {(task.amount / 1000000000).toFixed(4)} SOL
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      task.done 
                        ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                        : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {task.done ? 'Completed' : 'In Progress'}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {task.votesReceived}/{task.votesRequired} votes
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
