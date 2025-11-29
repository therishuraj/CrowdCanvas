'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { useRouter } from 'next/navigation';

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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <button
            onClick={fetchTasks}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tasks created yet. Create your first task above!
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer"
                onClick={() => viewTask(task._id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                      {(task.amount / 1000000000).toFixed(4)} SOL
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                      task.done 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.done ? 'Completed' : 'In Progress'}
                    </div>
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
