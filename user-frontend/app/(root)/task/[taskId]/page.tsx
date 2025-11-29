'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Appbar from '@/components/Appbar';
import { BACKEND_URL } from '@/lib/config';

interface OptionResult {
  count: number;
  option: {
    imageUrl: string;
  };
}

interface TaskDetails {
  id: string;
  title: string;
  options: any[];
}

export default function TaskResultPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const [result, setResult] = useState<Record<string, OptionResult>>({});
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskResults();
  }, [taskId]);

  const fetchTaskResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/v1/user/task?taskId=${taskId}`, {
        headers: { Authorization: token || '' }
      });
      setResult(response.data.result);
      setTaskDetails(response.data.taskDetails);
    } catch (error) {
      console.error('Failed to fetch task results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Appbar />
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-600">Loading task results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Appbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{taskDetails?.title}</h1>
            <p className="text-gray-600">Task ID: {taskId}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/?view=tasks')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to My Tasks
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Create New Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(result).map(([optionId, data]) => (
            <div key={optionId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={data.option.imageUrl} 
                alt="Option" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {data.count} votes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
